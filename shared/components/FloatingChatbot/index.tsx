"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useAuth } from "@/shared/contexts/auth-context";
import {
  streamChatMessage,
  ChatbotRequestError,
  clearChatConversation,
  type ChatMessage as ChatMsg,
  type ChatResponse,
} from "@/shared/lib/api/chatAssistant";
import { getChatUiContext } from "@/shared/lib/chatUiContext";
import type { Block } from "@/shared/types/chatResponse";
import {
  fetchChatbotSettings,
  isChatbotEnabledForPage,
  type ChatbotConfig,
} from "@/shared/lib/api/chatbotSettings";
import ChatMessage from "./ChatMessage";
import { useDraggableFab } from "./useDraggableFab";
import {
  AgentOrb,
  ConsoleStyles,
  EmptyChatState,
  IconButton,
  Kbd,
  ReasoningIndicator,
  TABLE_PAGE_SIZE,
} from "./ui";

/** Wide tables / long lists are cramped in the 420px dock — promote to full page. */
function blocksNeedFullscreen(blocks?: Block[]): boolean {
  if (!blocks?.length) return false;
  for (const b of blocks) {
    if (b.type === "table") {
      if ((b.columns?.length ?? 0) >= 4) return true;
      if ((b.rows?.length ?? 0) > TABLE_PAGE_SIZE) return true;
    }
    if (b.type === "cards" && (b.items?.length ?? 0) > 6) return true;
    if (b.type === "group" && blocksNeedFullscreen(b.blocks)) return true;
  }
  return false;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  blocks?: Block[];
  entityType?: string | null;
  queryId?: string | null;
}

type ViewMode = "closed" | "widget" | "fullscreen";

const MAX_STORED_MESSAGES = 20;
const FAB_SIZE = 56;
const FAB_MARGIN = 20;
const SIDEBAR_WIDTH = 420;
/**
 * Only push the body content when the viewport is wide enough that
 * shrinking by SIDEBAR_WIDTH still leaves a usable canvas for content
 * (taskboard columns, chat rails, etc.). Below this width, the panel
 * overlays instead of pushing — preventing the taskboard-overlap bug
 * where a narrow remaining canvas (e.g. 1024px - 420px = 604px) was
 * too tight for the 5-column kanban grid + filters.
 */
const SIDEBAR_PUSH_BREAKPOINT = 1280;
const SIDEBAR_TRANSITION_MS = 320;
const UNDO_WINDOW_MS = 8000;

const SUGGESTED_QUESTIONS = [
  { q: "How many employees do we have?", k: "PEOPLE" },
  { q: "List all open job positions", k: "JOBS" },
  { q: "Who is on leave today?", k: "LEAVE" },
  { q: "Show pending job applications", k: "ATS" },
  { q: "What are today's holidays?", k: "CAL" },
  { q: "List all active projects", k: "PROJ" },
];

function FloatingChatbotInner({ userId }: { userId: string }) {
  const [viewMode, setViewMode] = useState<ViewMode>("closed");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clearedMessages, setClearedMessages] = useState<Message[] | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const storageKey = `dharwin_chat_${userId}`;
  const fabPosKey = `dharwin_chat_fab_pos_${userId}`;

  const isOpen = viewMode !== "closed";
  const isFullscreen = viewMode === "fullscreen";

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: Message[] = JSON.parse(saved);
        setMessages(parsed.slice(-MAX_STORED_MESSAGES));
      }
    } catch {
      /* ignore corrupt history */
    }
  }, [storageKey]);

  useEffect(() => {
    if (messages.length === 0) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
    } catch {
      /* ignore quota */
    }
  }, [messages, storageKey]);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) abortRef.current?.abort();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setViewMode((v) => (v === "fullscreen" ? "widget" : "closed"));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 140)}px`;
  }, [input]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;

    const apply = () => {
      const wide = window.innerWidth >= SIDEBAR_PUSH_BREAKPOINT;
      const shouldPush = viewMode === "widget" && wide;
      body.style.transition = `padding-right ${SIDEBAR_TRANSITION_MS}ms cubic-bezier(0.22,1,0.36,1)`;
      body.style.paddingRight = shouldPush ? `${SIDEBAR_WIDTH}px` : "";
    };

    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      body.style.paddingRight = "";
      body.style.transition = "";
    };
  }, [viewMode]);

  // Clearing wipes localStorage AND the server-side conversation, and the
  // trash icon sits next to Expand/Close. It used to be one irreversible
  // click. Hold the thread in memory for UNDO_WINDOW_MS so a misclick is
  // recoverable; the server call is deferred until that window closes.
  const clearHistory = () => {
    if (messages.length === 0) return;
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setClearedMessages(messages);
    setMessages([]);
    try { localStorage.removeItem(storageKey); } catch { /* ignore */ }
    undoTimerRef.current = setTimeout(() => {
      setClearedMessages(null);
      undoTimerRef.current = null;
      void clearChatConversation();
    }, UNDO_WINDOW_MS);
  };

  const undoClear = () => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    undoTimerRef.current = null;
    if (clearedMessages) setMessages(clearedMessages);
    setClearedMessages(null);
  };

  const stopStreaming = () => {
    abortRef.current?.abort();
    setIsLoading(false);
  };

  const handleSend = useCallback(async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    if (!overrideText) setInput("");
    setIsLoading(true);

    const assistantId = `a-${Date.now()}`;
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const history: ChatMsg[] = nextMessages.map((m) => ({ role: m.role, content: m.content }));
      await streamChatMessage(
        history,
        (token) => {
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + token } : m))
          );
        },
        controller.signal,
        (env: ChatResponse) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    blocks: env.blocks ?? [],
                    entityType: env.meta?.entityType ?? env.meta?.kind ?? null,
                    queryId: env.meta?.queryId ?? null,
                  }
                : m
            )
          );
          if (env.blocks && env.blocks.length > 0 && blocksNeedFullscreen(env.blocks)) {
            setViewMode((v) => (v === "widget" ? "fullscreen" : v));
          }
        },
        getChatUiContext()
      );
    } catch (err: unknown) {
      const aborted = err instanceof Error && err.name === "AbortError";
      if (aborted) {
        setMessages((prev) => prev.filter((m) => !(m.id === assistantId && m.content === "")));
      } else {
        const friendly =
          err instanceof ChatbotRequestError
            ? err.userMessage
            : "I couldn't finish that just now. Please try again.";
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: friendly } : m))
        );
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [input, isLoading, messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const lastMsg = messages[messages.length - 1];
  const isPreparing = isLoading && lastMsg?.role === "assistant" && lastMsg.content === "";
  const isStreaming = isLoading && lastMsg?.role === "assistant" && lastMsg.content !== "";

  const statusLabel = isPreparing ? "Reasoning" : isStreaming ? "Streaming" : "Online";

  const fab = useDraggableFab({
    storageKey: fabPosKey,
    fabSize: FAB_SIZE,
    margin: FAB_MARGIN,
    onClick: () => setViewMode((v) => (v === "closed" ? "widget" : "closed")),
  });

  return (
    <>
      <ConsoleStyles />

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[10995] bg-slate-950/50 backdrop-blur-md transition-opacity duration-300 ${
          isFullscreen
            ? "opacity-100 pointer-events-auto"
            : viewMode === "widget"
              ? "opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none"
              : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setViewMode(isFullscreen ? "widget" : "closed")}
        aria-hidden
      />

      {/* Agent console */}
      <div
        className={[
          "agent-console fixed top-0 right-0 z-[11000] flex flex-col overflow-hidden",
          "bg-white dark:bg-slate-950",
          "border-l border-slate-200 dark:border-slate-800",
          "shadow-[-12px_0_40px_-14px_rgba(15,23,42,0.18)] dark:shadow-[-12px_0_40px_-14px_rgba(0,0,0,0.7)]",
          "transition-[transform,width] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          // Full page = near-viewport slide-over (left gutter keeps backdrop dismissible).
          isFullscreen
            ? "h-screen w-[min(100vw,calc(100vw-1.25rem))] sm:w-[min(100vw,calc(100vw-2.5rem))] max-w-none"
            : "h-screen w-[94vw] max-w-[420px]",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-label="Dharwin Assistant"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="relative z-10 flex flex-shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3.5 py-3 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex min-w-0 items-center gap-3">
            <AgentOrb size="md" pulse={isPreparing || isStreaming} />

            <div className="min-w-0">
              <span className="block truncate text-[15px] font-semibold text-slate-900 dark:text-slate-50">Dharwin</span>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${isPreparing || isStreaming ? "bg-primary" : "bg-emerald-500"}`} />
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{statusLabel}</span>
                {(isPreparing || isStreaming) && (
                  <span className="ml-1 inline-flex h-[3px] w-12 origin-left overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <span
                      className="block h-full w-full bg-primary"
                      style={{ animation: "agent-bar 1.4s ease-in-out infinite" }}
                    />
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="relative flex items-center gap-0.5">
            {/* Always rendered, disabled when there is nothing to clear —
                conditional rendering made Expand and Close jump sideways
                under the cursor whenever the thread state changed. */}
            <IconButton
              onClick={clearHistory}
              label="Clear conversation"
              disabled={messages.length === 0 || isLoading}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </IconButton>
            <IconButton
              onClick={() => setViewMode(isFullscreen ? "widget" : "fullscreen")}
              label={isFullscreen ? "Collapse" : "Expand to fullscreen"}
            >
              {isFullscreen ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V5H5m14 0h-4v4M5 15h4v4m6 0v-4h4" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 4h-4v4M4 16v4h4m12-4v4h-4" />
                </svg>
              )}
            </IconButton>
            <IconButton onClick={() => setViewMode("closed")} label="Close">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </IconButton>
          </div>
        </div>

        {/* Messages */}
        <div className={`agent-scrollbar relative z-10 min-h-0 flex-1 overflow-y-auto ${isFullscreen ? "px-3 sm:px-6 md:px-10 lg:px-16 py-6" : "px-3.5 py-4"}`}>
          <div className={isFullscreen ? "mx-auto w-full max-w-7xl" : ""}>
            {messages.length === 0 && (
              <EmptyChatState
                fullscreen={isFullscreen}
                onPick={(q) => handleSend(q)}
                disabled={isLoading}
                suggestions={SUGGESTED_QUESTIONS}
              />
            )}

            {messages.map((msg) =>
              msg.role === "assistant" && msg.content === "" ? null : (
                <ChatMessage
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  fullscreen={isFullscreen}
                  blocks={msg.blocks}
                  entityType={msg.entityType}
                  queryId={msg.queryId}
                  onAction={(text) => handleSend(text)}
                />
              )
            )}

            {isPreparing && <ReasoningIndicator />}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Composer */}
        <div className={`relative z-10 flex-shrink-0 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 ${isFullscreen ? "px-4 sm:px-8 md:px-16 py-4" : "px-3 py-3"}`}>
          <div className={isFullscreen ? "mx-auto max-w-3xl" : ""}>
            {clearedMessages && (
              <div className="mb-2 flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <span>Conversation cleared.</span>
                <button
                  type="button"
                  onClick={undoClear}
                  className="rounded font-semibold text-violet-700 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:text-violet-300"
                >
                  Undo
                </button>
              </div>
            )}
            {/* Composer box. `items-end` pins the button to the last line as
                the textarea grows. Both are 40px tall, so a single-line
                composer reads as one row and the button no longer needs a
                `mb-1` nudge to fake alignment. Send and Stop share a radius
                and a footprint so the control keeps its shape mid-stream. */}
            <div className="flex items-end gap-1.5 rounded-xl border border-slate-300 bg-white p-1.5 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25 dark:border-slate-700 dark:bg-slate-900">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Message the agent"
                placeholder={isLoading ? "Generating reply…" : "Ask the agent anything…"}
                rows={1}
                disabled={isLoading}
                enterKeyHint="send"
                /* `border-0 focus:ring-0` is load-bearing: @tailwindcss/forms
                   puts a 1px border + focus ring on every bare <textarea> in
                   the base layer, which drew a second rectangle inside the
                   composer box. The box owns the frame; the field is bare.

                   py + leading = 40px, matching the button. max-h mirrors the
                   140px cap the auto-resize effect writes inline; `max-h-36`
                   (144px) never applied. */
                className="min-h-10 max-h-[140px] flex-1 resize-none overflow-y-auto border-0 bg-transparent px-2 py-[9px] text-[13px] leading-[22px] text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0 disabled:opacity-60 dark:text-slate-100 dark:placeholder:text-slate-500"
              />
              {isLoading ? (
                <button
                  onClick={stopStreaming}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-rose-500 text-white transition-[background-color,transform] duration-150 hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-1 active:scale-95"
                  aria-label="Stop generating"
                  title="Stop"
                >
                  <span className="block h-3 w-3 rounded-sm bg-current" />
                </button>
              ) : (
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  /* Disabled was white-on-slate-300 (~1.6:1) — the icon
                     vanished. Dim the ink with the fill so it still reads. */
                  className="group/btn flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-[background-color,transform] duration-150 hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
                  aria-label="Send"
                  title="Send"
                >
                  <svg
                    className="h-4 w-4 -translate-x-px translate-y-px transition-transform duration-150 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l14-7-7 14-2-5-5-2z" />
                  </svg>
                </button>
              )}
            </div>
            {/* Safety copy: was 10px slate-400 (2.56:1, fails AA) and
                `truncate`d mid-sentence. Now 11px slate-600 (7.6:1) and
                allowed to wrap. */}
            <div className="mt-2 flex items-start justify-between gap-3 px-1 text-[11px] text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-start gap-1.5">
                <svg className="mt-px h-3 w-3 flex-shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
                </svg>
                <span>AI replies may be inaccurate. Verify before acting.</span>
              </span>
              <span className="hidden flex-shrink-0 items-center gap-1 sm:inline-flex">
                <Kbd>Enter</Kbd>
                <span className="opacity-70">send</span>
                <span className="mx-0.5 opacity-30">·</span>
                <Kbd>⇧</Kbd>
                <Kbd>Enter</Kbd>
                <span className="opacity-70">newline</span>
                {!isFullscreen && (
                  <>
                    <span className="mx-0.5 opacity-30">·</span>
                    <Kbd>Esc</Kbd>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating draggable FAB */}
      <button
        ref={fab.fabRef}
        {...fab.handlers}
        style={fab.style}
        aria-label="Open Dharwin Agent"
        aria-hidden={isOpen}
        tabIndex={isOpen ? -1 : 0}
        className={[
          "agent-fab z-[11001] select-none touch-manipulation",
          "h-14 w-14 rounded-full text-white",
          "relative overflow-visible",
          "transition-[transform,opacity] duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isOpen ? "pointer-events-none scale-75 opacity-0" : "scale-100 opacity-100",
          fab.isDragging ? "cursor-grabbing scale-110" : "cursor-grab hover:scale-105 active:scale-95",
        ].join(" ")}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-primary shadow-[0_8px_24px_-8px_rgb(132_90_223_/_0.6)]"
        />
        <span className="relative flex h-full w-full items-center justify-center">
          <svg className="h-6 w-6 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </span>
      </button>
    </>
  );
}

export default function FloatingChatbot() {
  const { user, permissions, permissionsLoaded } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [chatbotConfig, setChatbotConfig] = useState<ChatbotConfig | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reloadConfig = useCallback(() => {
    if (!user) return;
    fetchChatbotSettings()
      .then(setChatbotConfig)
      .catch(() => setChatbotConfig({ isGloballyEnabled: true, enabledPages: [] }));
  }, [user]);

  useEffect(() => {
    reloadConfig();
  }, [reloadConfig]);

  const hasChatbotAccess = permissions.some((p) => {
    if (!p.startsWith("ai.chatbot:")) return false;
    return p.slice("ai.chatbot:".length).split(",").map((s) => s.trim()).includes("view");
  });

  if (!user || !mounted || !permissionsLoaded) return null;
  if (!hasChatbotAccess) return null;
  if (!isChatbotEnabledForPage(pathname ?? "/", chatbotConfig)) return null;

  return createPortal(
    <FloatingChatbotInner userId={String(user.id)} />,
    document.body
  );
}

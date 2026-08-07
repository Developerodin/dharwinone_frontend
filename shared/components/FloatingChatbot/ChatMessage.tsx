"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Block } from "@/shared/types/chatResponse";
import { AgentOrb, CopyButton, SURFACE, TYPE } from "./ui";
import StructuredResponse from "./renderers/StructuredResponse";
import { mdComponents } from "./renderers/markdown";

interface Props {
  role: "user" | "assistant";
  content: string;
  fullscreen?: boolean;
  blocks?: Block[];
  onAction?: (text: string) => void;
}

export default function ChatMessage({ role, content, fullscreen = false, blocks, onAction }: Props) {
  const isUser = role === "user";
  const bubbleMax = fullscreen
    ? isUser
      ? "max-w-[88%] sm:max-w-[75%] md:max-w-[65%]"
      : "max-w-[96%] sm:max-w-[92%] md:max-w-[90%]"
    : "max-w-[90%] sm:max-w-[85%]";

  return (
    <div className={`group/msg mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mr-2 flex-shrink-0">
          <AgentOrb size="sm" />
        </div>
      )}

      <div className={`flex min-w-0 max-w-full flex-col ${isUser ? "" : "flex-1"}`}>
        {/* The one mono-uppercase role left in the component. */}
        <div className={`mb-1 flex items-center gap-2 px-1 ${isUser ? "justify-end" : ""}`}>
          <span className={TYPE.author}>{isUser ? "You" : "Dharwin"}</span>
        </div>

        <div
          className={[
            bubbleMax,
            "relative min-w-0 max-w-full overflow-hidden box-border text-[13px] leading-relaxed break-words [overflow-wrap:anywhere]",
            isUser
              ? `${SURFACE.bubbleUser} whitespace-pre-wrap px-3.5 py-2.5`
              : `${SURFACE.bubbleAgent} w-full px-1`,
          ].join(" ")}
        >
          <div className="relative">
            {isUser ? (
              content
            ) : blocks && blocks.length > 0 ? (
              <StructuredResponse blocks={blocks} compact={!fullscreen} onAction={onAction} />
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                {content}
              </ReactMarkdown>
            )}
          </div>

          {/* Reveal on hover OR keyboard focus — opacity-0 alone made this
              unreachable for keyboard users and invisible on touch. */}
          {!isUser && content && (
            <div className="mt-2 -mb-0.5 flex items-center justify-end opacity-0 transition-opacity duration-200 focus-within:opacity-100 group-hover/msg:opacity-100">
              <CopyButton text={content} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

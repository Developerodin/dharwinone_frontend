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
  // Cap measure on the painted bubble (not a parent wrapper) so padding is
  // inside max-width via box-border and long queries wrap instead of escaping
  // the purple fill.
  const bubbleMax = fullscreen
    ? isUser
      ? "max-w-[min(100%,42rem)] sm:max-w-[min(75%,40rem)] md:max-w-[min(65%,36rem)]"
      : "max-w-[96%] sm:max-w-[92%] md:max-w-[90%]"
    : isUser
      ? "max-w-[min(100%,22rem)] sm:max-w-[min(100%,24rem)]"
      : "max-w-[92%] sm:max-w-[90%]";

  return (
    <article
      className={`group/msg mb-5 flex w-full min-w-0 last:mb-2 ${isUser ? "justify-end" : "justify-start"}`}
      aria-label={isUser ? "Your message" : "Dharwin reply"}
    >
      {!isUser && (
        <div className="mr-2.5 mt-0.5 flex-shrink-0 self-start">
          <AgentOrb size="sm" />
        </div>
      )}

      <div
        className={[
          "flex min-w-0 max-w-full flex-col",
          isUser ? "items-end" : "flex-1",
        ].join(" ")}
      >
        {/* The one mono-uppercase role left in the component. */}
        <div className={`mb-1.5 flex items-center gap-2 px-1 ${isUser ? "justify-end" : ""}`}>
          <span className={TYPE.author}>{isUser ? "You" : "Dharwin"}</span>
        </div>

        <div
          className={[
            "relative box-border min-w-0 break-words text-[13px] leading-[1.55]",
            "[overflow-wrap:anywhere] [word-break:break-word]",
            bubbleMax,
            isUser
              ? // w-fit + bubbleMax: hug short copy; wrap long copy inside the fill.
                // No overflow-hidden — that clipped glyphs into the radius and
                // looked like text escaping the purple background.
                // Do not add max-w-full here — it fights bubbleMax in Tailwind's CSS order.
                `${SURFACE.bubbleUser} w-fit whitespace-pre-wrap px-5 py-3`
              : `${SURFACE.bubbleAgent} w-full px-0.5 sm:px-1`,
          ].join(" ")}
        >
          <div className="relative min-w-0 max-w-full">
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
            <div className="mt-2.5 flex items-center justify-end opacity-0 transition-opacity duration-200 ease-out focus-within:opacity-100 group-hover/msg:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100">
              <CopyButton text={content} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

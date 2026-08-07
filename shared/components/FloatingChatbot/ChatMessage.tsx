"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Block } from "@/shared/types/chatResponse";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { AgentOrb, CopyButton, TYPE } from "./ui";
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

  // Widen the primitive's default max-w-[80%] for this panel's measure.
  const bubbleWidth = fullscreen
    ? isUser
      ? "max-w-[min(100%,42rem)] sm:max-w-[min(75%,40rem)] md:max-w-[min(65%,36rem)]"
      : "max-w-[96%] sm:max-w-[92%] md:max-w-[90%]"
    : isUser
      ? "max-w-[min(100%,22rem)] sm:max-w-[min(100%,24rem)]"
      : "max-w-[92%] sm:max-w-[90%]";

  return (
    <article
      data-slot="message"
      data-align={isUser ? "end" : "start"}
      className={`group/msg group/message mb-5 flex w-full min-w-0 last:mb-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
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
        <div className={`mb-1.5 flex items-center gap-2 px-1 ${isUser ? "justify-end" : ""}`}>
          <span className={TYPE.author}>{isUser ? "You" : "Dharwin"}</span>
        </div>

        <BubbleGroup
          className={isUser ? "w-fit max-w-full self-end" : "w-full"}
        >
          <Bubble
            variant={isUser ? "default" : "muted"}
            align={isUser ? "end" : "start"}
            className={bubbleWidth}
          >
            <BubbleContent
              className={[
                "text-[13px] leading-[1.55]",
                // User: hug copy with BubbleContent's equal p-3; do not stretch
                // to column width (left-aligned text + empty right).
                isUser ? "w-fit max-w-full whitespace-pre-wrap" : "w-full max-w-full",
              ].join(" ")}
            >
              {isUser ? (
                content
              ) : blocks && blocks.length > 0 ? (
                <StructuredResponse blocks={blocks} compact={!fullscreen} onAction={onAction} />
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {content}
                </ReactMarkdown>
              )}
            </BubbleContent>
          </Bubble>
        </BubbleGroup>

        {!isUser && content && (
          <div className="mt-2.5 flex items-center justify-end opacity-0 transition-opacity duration-200 ease-out focus-within:opacity-100 group-hover/msg:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100">
            <CopyButton text={content} />
          </div>
        )}
      </div>
    </article>
  );
}

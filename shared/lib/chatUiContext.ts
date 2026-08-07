"use client";

export type ChatUiContext = {
  currentModule: string;
  currentProject?: string | null;
  activeFilters?: {
    assignee?: string | null;
    stage?: string | null;
    search?: string | null;
  };
  visibleCounts?: {
    total: number;
    new: number;
    todo: number;
    ongoing: number;
    review: number;
    completed: number;
  };
};

let latestUiContext: ChatUiContext | null = null;

export function setChatUiContext(ctx: ChatUiContext | null): void {
  latestUiContext = ctx;
}

export function getChatUiContext(): ChatUiContext | null {
  return latestUiContext;
}

export function clearChatUiContext(): void {
  latestUiContext = null;
}

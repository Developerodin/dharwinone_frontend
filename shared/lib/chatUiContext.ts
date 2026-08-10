"use client";

import type {
  EmployeeCompensationType,
  EmployeeEmploymentStatus,
} from "@/shared/schemas/employeeFilter.generated";

export type ChatUiContext = {
  currentModule: string;
  currentProject?: string | null;
  activeFilters?: {
    /** Task Board */
    assignee?: string | null;
    stage?: string | null;
    /** Employees (Advanced Search) */
    employmentStatus?: EmployeeEmploymentStatus;
    compensationType?: EmployeeCompensationType | "";
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

"use client";

import Swal from "sweetalert2";
import { getYmdDateRangeIncompleteError } from "@/shared/lib/ymd-filter-date-input.util";

const INCOMPLETE_RANGE_TITLE = "Date range incomplete";

/** Shows a warning when only one side of a paired YMD filter is filled. Returns true if shown. */
export async function alertYmdDateRangeIncomplete(
  startLabel: string,
  endLabel: string,
  start?: string | null,
  end?: string | null
): Promise<boolean> {
  const text = getYmdDateRangeIncompleteError(startLabel, endLabel, start, end);
  if (!text) return false;
  await Swal.fire({
    icon: "warning",
    title: INCOMPLETE_RANGE_TITLE,
    text,
    confirmButtonText: "OK",
  });
  return true;
}

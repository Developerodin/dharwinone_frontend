import * as XLSX from "xlsx";

/** Strip HTML tags and collapse whitespace for export cells. */
export function stripHtmlForExport(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Normalize text for export: null/undefined → blank, arrays → comma-separated. */
export function normalizeExportText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) {
    return value
      .map((item) => normalizeExportText(item))
      .filter((item) => item.length > 0)
      .join(", ");
  }
  return stripHtmlForExport(value);
}

/** Parse YYYY-MM-DD (or ISO prefix) as a local calendar date — no UTC day shift. */
export function parseExportDateOnly(
  value: string | Date | null | undefined
): Date | null {
  if (!value) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Parse datetime values for Excel date cells. */
export function parseExportDateTime(
  value: string | Date | null | undefined
): Date | null {
  if (!value) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

export interface ProfessionalSheetLayoutOptions {
  /** 1-based Excel row index of the column header row. */
  headerRow: number;
  /** 1-based Excel row index of the last data row (inclusive). */
  lastRow: number;
  /** Number of columns (A..N). */
  columnCount: number;
  /** Per-column character widths. */
  colWidths?: number[];
  /** 1-based row heights in points. */
  rowHeights?: Record<number, number>;
}

/** Apply shared presentation metadata: widths, freeze, filter, hidden gridlines. */
export function applyProfessionalSheetLayout(
  ws: XLSX.WorkSheet,
  options: ProfessionalSheetLayoutOptions
): void {
  const { headerRow, lastRow, columnCount, colWidths, rowHeights } = options;
  const lastCol = XLSX.utils.encode_col(columnCount - 1);

  if (colWidths?.length) {
    ws["!cols"] = colWidths.map((wch) => ({ wch }));
  }

  if (rowHeights) {
    const maxRow = Math.max(...Object.keys(rowHeights).map(Number));
    const rows: XLSX.RowInfo[] = [];
    for (let row = 1; row <= maxRow; row += 1) {
      const hpt = rowHeights[row];
      if (hpt) {
        rows[row - 1] = { hpt, hpx: Math.round(hpt * 1.33) };
      }
    }
    ws["!rows"] = rows;
  }

  if (lastRow >= headerRow) {
    ws["!autofilter"] = { ref: `A${headerRow}:${lastCol}${lastRow}` };
  }

  ws["!sheetViews"] = [
    {
      showGridLines: false,
      xSplit: 0,
      ySplit: headerRow,
      topLeftCell: `A${headerRow + 1}`,
      state: "frozen",
    },
  ];
}

/** A leading =, +, -, or @ is quoted so Excel treats the cell as text, not a formula. */
export function defangCell(v: unknown): string | number | Date {
  if (v === null || v === undefined) return "";
  if (v instanceof Date) return v;
  if (typeof v === "number") return v;
  const s = String(v);
  return /^[=+\-@]/.test(s) ? `'${s}` : s;
}

/** "YYYY-MM-DD HH:mm" UTC — readable in a cell, unlike a raw ISO string. */
export function fmtExportDateTime(d: string | Date | null | undefined): string {
  if (!d) return "";
  const dt = new Date(d);
  return Number.isNaN(dt.getTime()) ? "" : dt.toISOString().slice(0, 16).replace("T", " ");
}

/** "YYYY-MM-DD" UTC for date-only fields. */
export function fmtExportDate(d: string | Date | null | undefined): string {
  if (!d) return "";
  const dt = new Date(d);
  return Number.isNaN(dt.getTime()) ? "" : dt.toISOString().slice(0, 10);
}

/**
 * One sheet per section, header on row 1, so every sheet sorts and filters.
 * Columns are sized to their longest value (clamped 10..60) so nothing truncates.
 */
export function addSheet(
  wb: XLSX.WorkBook,
  name: string,
  headers: string[],
  rows: unknown[][]
): void {
  const aoa = [headers, ...rows.map((r) => r.map(defangCell))];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws["!cols"] = headers.map((h, col) => {
    const longest = aoa.reduce((max, row) => {
      const len = String(row[col] ?? "").length;
      return len > max ? len : max;
    }, h.length);
    return { wch: Math.min(Math.max(longest + 2, 10), 60) };
  });
  const lastCol = XLSX.utils.encode_col(headers.length - 1);
  ws["!autofilter"] = { ref: `A1:${lastCol}${aoa.length}` };
  XLSX.utils.book_append_sheet(wb, ws, name);
}

export function downloadWorkbook(wb: XLSX.WorkBook, filename: string): void {
  XLSX.writeFile(wb, filename);
}

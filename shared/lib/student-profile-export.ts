import * as XLSX from "xlsx";
import type { Student } from "@/shared/lib/api/students";
import {
  applyProfessionalSheetLayout,
  defangCell,
  downloadWorkbook,
  normalizeExportText,
  parseExportDateOnly,
  parseExportDateTime,
} from "./xlsx-export";

type ProfileRowValue = string | number | Date;

interface ProfileField {
  label: string;
  value: ProfileRowValue;
  wrap?: boolean;
}

interface TableSheetConfig {
  title: string;
  headers: string[];
  rows: ProfileRowValue[][];
  dateOnlyColumns?: number[];
  dateTimeColumns?: number[];
  wrapColumns?: number[];
}

const PROFILE_FIELD_WIDTH = 22;
const PROFILE_VALUE_WIDTH = 48;
const TABLE_COL_MIN = 12;
const TABLE_COL_MAX = 42;
const BIO_ROW_HEIGHT = 72;

function toSheetCell(value: ProfileRowValue): string | number | Date {
  return defangCell(value);
}

function buildTableRows(
  headers: string[],
  rows: ProfileRowValue[][],
  dateOnlyColumns: number[] = [],
  dateTimeColumns: number[] = []
): ProfileRowValue[][] {
  return rows.map((row) =>
    row.map((cell, colIndex) => {
      if (dateOnlyColumns.includes(colIndex)) {
        const date = parseExportDateOnly(cell as string | Date | null | undefined);
        return date ?? "";
      }
      if (dateTimeColumns.includes(colIndex)) {
        const date = parseExportDateTime(cell as string | Date | null | undefined);
        return date ?? "";
      }
      return normalizeExportText(cell);
    })
  );
}

function estimateColWidths(headers: string[], rows: ProfileRowValue[][]): number[] {
  const widths = headers.map((header) => header.length);
  for (const row of rows) {
    row.forEach((cell, index) => {
      const len =
        cell instanceof Date
          ? 12
          : String(cell ?? "").length;
      widths[index] = Math.max(widths[index], len);
    });
  }
  return widths.map((width) =>
    Math.min(Math.max(width + 2, TABLE_COL_MIN), TABLE_COL_MAX)
  );
}

function assignDateCell(ws: XLSX.WorkSheet, row: number, col: number, value: Date): void {
  ws[XLSX.utils.encode_cell({ r: row, c: col })] = { t: "d", v: value };
}

function addProfessionalTableSheet(wb: XLSX.WorkBook, sheetName: string, config: TableSheetConfig): void {
  const normalizedRows = buildTableRows(
    config.headers,
    config.rows,
    config.dateOnlyColumns,
    config.dateTimeColumns
  );
  const aoa: ProfileRowValue[][] = [
    [config.title],
    [],
    config.headers,
    ...normalizedRows,
  ];
  const ws = XLSX.utils.aoa_to_sheet(aoa.map((row) => row.map(toSheetCell)));

  normalizedRows.forEach((row, rowIndex) => {
    const sheetRow = rowIndex + 3;
    config.dateOnlyColumns?.forEach((colIndex) => {
      const value = row[colIndex];
      if (value instanceof Date) {
        assignDateCell(ws, sheetRow, colIndex, value);
      }
    });
    config.dateTimeColumns?.forEach((colIndex) => {
      const value = row[colIndex];
      if (value instanceof Date) {
        assignDateCell(ws, sheetRow, colIndex, value);
      }
    });
  });

  const wrapRows: Record<number, number> = {};
  if (config.wrapColumns?.length) {
    normalizedRows.forEach((row, rowIndex) => {
      const excelRow = rowIndex + 4;
      const needsWrap = config.wrapColumns!.some((colIndex) => {
        const text = String(row[colIndex] ?? "");
        return text.length > 40;
      });
      if (needsWrap) {
        wrapRows[excelRow] = 48;
      }
    });
  }

  applyProfessionalSheetLayout(ws, {
    headerRow: 3,
    lastRow: aoa.length,
    columnCount: config.headers.length,
    colWidths: estimateColWidths(config.headers, normalizedRows),
    rowHeights: {
      1: 24,
      2: 8,
      3: 20,
      ...wrapRows,
    },
  });

  XLSX.utils.book_append_sheet(wb, ws, sheetName);
}

function addProfileSheet(wb: XLSX.WorkBook, fields: ProfileField[]): void {
  const dataRows = fields.map((field) => [field.label, field.value]);
  const aoa: ProfileRowValue[][] = [
    ["Student Details", ""],
    ["", ""],
    ["Field", "Value"],
    ...dataRows,
  ];
  const ws = XLSX.utils.aoa_to_sheet(aoa.map((row) => row.map(toSheetCell)));

  fields.forEach((field, index) => {
    if (field.value instanceof Date) {
      assignDateCell(ws, index + 3, 1, field.value);
    }
  });

  const rowHeights: Record<number, number> = {
    1: 24,
    2: 8,
    3: 20,
  };
  fields.forEach((field, index) => {
    if (field.wrap) {
      rowHeights[index + 4] = BIO_ROW_HEIGHT;
    }
  });

  applyProfessionalSheetLayout(ws, {
    headerRow: 3,
    lastRow: aoa.length,
    columnCount: 2,
    colWidths: [PROFILE_FIELD_WIDTH, PROFILE_VALUE_WIDTH],
    rowHeights,
  });

  XLSX.utils.book_append_sheet(wb, ws, "Profile");
}

function profileFields(student: Student): ProfileField[] {
  const user = student.user || {};
  const addr = student.address || {};

  return [
    { label: "Name", value: normalizeExportText(user.name) },
    { label: "Email", value: normalizeExportText(user.email) },
    { label: "Phone", value: normalizeExportText(student.phone) },
    { label: "Gender", value: normalizeExportText(student.gender) },
    {
      label: "Date of Birth",
      value: parseExportDateOnly(student.dateOfBirth) ?? "",
    },
    { label: "Position", value: normalizeExportText(student.position?.name) },
    { label: "Status", value: normalizeExportText(student.status) },
    { label: "Shift", value: normalizeExportText(student.shift?.name) },
    {
      label: "Joining Date",
      value: parseExportDateOnly(student.joiningDate) ?? "",
    },
    { label: "City", value: normalizeExportText(addr.city) },
    { label: "State", value: normalizeExportText(addr.state) },
    { label: "Country", value: normalizeExportText(addr.country) },
    { label: "Skills", value: normalizeExportText(student.skills) },
    { label: "Bio", value: normalizeExportText(student.bio), wrap: true },
    {
      label: "Created At",
      value: parseExportDateTime(student.createdAt) ?? "",
    },
  ];
}

/** Build a multi-sheet workbook for one training student profile. */
export function buildStudentProfileWorkbook(student: Student): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();
  addProfileSheet(wb, profileFields(student));

  const education = student.education || [];
  if (education.length > 0) {
    addProfessionalTableSheet(wb, "Education", {
      title: "Education History",
      headers: ["Degree", "Institution", "Field", "Start", "End", "Current", "Description"],
      rows: education.map((entry) => [
        entry.degree ?? "",
        entry.institution ?? "",
        entry.fieldOfStudy ?? "",
        entry.startDate ?? "",
        entry.endDate ?? "",
        entry.isCurrent ? "Yes" : "No",
        entry.description ?? "",
      ]),
      dateOnlyColumns: [3, 4],
      wrapColumns: [6],
    });
  }

  const experience = student.experience || [];
  if (experience.length > 0) {
    addProfessionalTableSheet(wb, "Experience", {
      title: "Work Experience",
      headers: ["Title", "Company", "Location", "Start", "End", "Current", "Description"],
      rows: experience.map((entry) => [
        entry.title ?? "",
        entry.company ?? "",
        entry.location ?? "",
        entry.startDate ?? "",
        entry.endDate ?? "",
        entry.isCurrent ? "Yes" : "No",
        entry.description ?? "",
      ]),
      dateOnlyColumns: [3, 4],
      wrapColumns: [6],
    });
  }

  const documents = student.documents || [];
  if (documents.length > 0) {
    addProfessionalTableSheet(wb, "Documents", {
      title: "Documents",
      headers: ["Name", "Type", "URL"],
      rows: documents.map((doc) => [doc.name ?? "", doc.type ?? "", doc.fileUrl ?? ""]),
    });
  }

  return wb;
}

/** Trigger a browser download of the student profile as `.xlsx`. */
export function downloadStudentProfileXlsx(student: Student, nameForFile: string): void {
  const wb = buildStudentProfileWorkbook(student);
  const safeName = (nameForFile || "student").replace(/[^\w.-]+/g, "_");
  const date = new Date().toISOString().slice(0, 10);
  downloadWorkbook(wb, `student_${safeName}_${date}.xlsx`);
}

import { describe, expect, it } from "vitest";
import { getMeetingActionVisibility } from "../permissions";
import { canAccessPath } from "../route-permissions";

/**
 * Meeting module permission matrix (Communication -> Meetings & Recordings row,
 * `communication.meetings:view,create,edit,delete`).
 *
 * Core rule under test: VIEW alone means "own meetings only" — the list only widens to
 * every meeting when ALL FOUR actions (view+create+edit+delete) are present. No single
 * management permission (create/edit/delete) may substitute for that combination.
 */

const perm = (actions: string) => [`communication.meetings:${actions}`];

describe("Meeting module — route/nav access requires VIEW", () => {
  it("view alone grants access", () => {
    expect(canAccessPath(perm("view"), "/communication/meetings")).toBe(true);
    expect(canAccessPath(perm("view,create,edit,delete"), "/communication/meetings")).toBe(true);
  });

  it("no view (even with create/edit/delete) blocks nav + route access", () => {
    expect(canAccessPath(perm("create"), "/communication/meetings")).toBe(false);
    expect(canAccessPath(perm("edit"), "/communication/meetings")).toBe(false);
    expect(canAccessPath(perm("delete"), "/communication/meetings")).toBe(false);
    expect(canAccessPath(perm("create,edit,delete"), "/communication/meetings")).toBe(false);
  });

  it("unrelated permission does not grant access", () => {
    expect(canAccessPath(["ats.jobs:view"], "/communication/meetings")).toBe(false);
  });

  it("no permissions at all blocks access (I. NO VIEW)", () => {
    expect(canAccessPath([], "/communication/meetings")).toBe(false);
  });
});

describe("Meeting module — row/page action visibility per permission combo", () => {
  // A. VIEW only
  it("A. VIEW only: recording + copy link visible; schedule/edit/cancel/delete hidden; not all-meetings", () => {
    const v = getMeetingActionVisibility(perm("view"));
    expect(v).toEqual({
      canView: true,
      canViewRecordings: true,
      canCopyLink: true,
      canSchedule: false,
      canEdit: false,
      canDelete: false,
      canSeeAllMeetings: false,
    });
  });

  // B. VIEW + CREATE
  it("B. VIEW + CREATE: adds schedule only", () => {
    const v = getMeetingActionVisibility(perm("view,create"));
    expect(v).toEqual({
      canView: true,
      canViewRecordings: true,
      canCopyLink: true,
      canSchedule: true,
      canEdit: false,
      canDelete: false,
      canSeeAllMeetings: false,
    });
  });

  // C. VIEW + EDIT
  it("C. VIEW + EDIT: adds edit only, no schedule", () => {
    const v = getMeetingActionVisibility(perm("view,edit"));
    expect(v).toEqual({
      canView: true,
      canViewRecordings: true,
      canCopyLink: true,
      canSchedule: false,
      canEdit: true,
      canDelete: false,
      canSeeAllMeetings: false,
    });
  });

  // D. VIEW + DELETE
  it("D. VIEW + DELETE: adds cancel/delete-series only, no schedule, no edit", () => {
    const v = getMeetingActionVisibility(perm("view,delete"));
    expect(v).toEqual({
      canView: true,
      canViewRecordings: true,
      canCopyLink: true,
      canSchedule: false,
      canEdit: false,
      canDelete: true,
      canSeeAllMeetings: false,
    });
  });

  // E. VIEW + CREATE + EDIT
  it("E. VIEW + CREATE + EDIT: schedule + edit, no cancel/delete, still own meetings", () => {
    const v = getMeetingActionVisibility(perm("view,create,edit"));
    expect(v).toEqual({
      canView: true,
      canViewRecordings: true,
      canCopyLink: true,
      canSchedule: true,
      canEdit: true,
      canDelete: false,
      canSeeAllMeetings: false,
    });
  });

  // F. VIEW + CREATE + DELETE
  it("F. VIEW + CREATE + DELETE: schedule + cancel/delete, no edit, still own meetings", () => {
    const v = getMeetingActionVisibility(perm("view,create,delete"));
    expect(v).toEqual({
      canView: true,
      canViewRecordings: true,
      canCopyLink: true,
      canSchedule: true,
      canEdit: false,
      canDelete: true,
      canSeeAllMeetings: false,
    });
  });

  // G. VIEW + EDIT + DELETE
  it("G. VIEW + EDIT + DELETE: edit + cancel/delete, no schedule, still own meetings", () => {
    const v = getMeetingActionVisibility(perm("view,edit,delete"));
    expect(v).toEqual({
      canView: true,
      canViewRecordings: true,
      canCopyLink: true,
      canSchedule: false,
      canEdit: true,
      canDelete: true,
      canSeeAllMeetings: false,
    });
  });

  // H. ALL FOUR
  it("H. ALL FOUR: every action visible AND all-meetings unlocked", () => {
    const v = getMeetingActionVisibility(perm("view,create,edit,delete"));
    expect(v).toEqual({
      canView: true,
      canViewRecordings: true,
      canCopyLink: true,
      canSchedule: true,
      canEdit: true,
      canDelete: true,
      canSeeAllMeetings: true,
    });
  });

  // I. NO VIEW (no permissions at all)
  it("I. NO permissions: nothing visible, not all-meetings", () => {
    const v = getMeetingActionVisibility([]);
    expect(v).toEqual({
      canView: false,
      canViewRecordings: false,
      canCopyLink: false,
      canSchedule: false,
      canEdit: false,
      canDelete: false,
      canSeeAllMeetings: false,
    });
  });

  it("create/edit/delete WITHOUT view never unlocks all-meetings or any icon (no substitute for VIEW)", () => {
    for (const actions of ["create", "edit", "delete", "create,edit,delete"]) {
      const v = getMeetingActionVisibility(perm(actions));
      expect(v.canSeeAllMeetings).toBe(false);
      expect(v.canViewRecordings).toBe(false);
      expect(v.canCopyLink).toBe(false);
    }
  });

  it("any single management permission alone does NOT unlock all-meetings (only the full combo does)", () => {
    const combos = [
      "view,create",
      "view,edit",
      "view,delete",
      "view,create,edit",
      "view,create,delete",
      "view,edit,delete",
    ];
    for (const actions of combos) {
      expect(getMeetingActionVisibility(perm(actions)).canSeeAllMeetings).toBe(false);
    }
  });
});

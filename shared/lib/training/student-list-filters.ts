import type { ListStudentsParams } from "@/shared/lib/api/students";

export type StudentStatusFilter = "all" | "active" | "inactive";

export interface StudentSidebarFilters {
  name: string[];
  skills: string[];
  education: string[];
  email: string;
  experience: [number, number];
}

export interface StudentListQueryInput {
  page: number;
  limit: number;
  sortBy: string;
  search?: string;
  statusFilter: StudentStatusFilter;
  filters: StudentSidebarFilters;
  experienceBounds: { min: number; max: number };
}

export function isExperienceFilterActive(
  filters: StudentSidebarFilters,
  bounds: { min: number; max: number }
): boolean {
  return filters.experience[0] !== bounds.min || filters.experience[1] !== bounds.max;
}

export function buildStudentListParams(input: StudentListQueryInput): ListStudentsParams {
  const params: ListStudentsParams = {
    page: input.page,
    limit: input.limit,
    sortBy: input.sortBy,
    status: input.statusFilter,
  };

  if (input.search?.trim()) {
    params.search = input.search.trim();
  }
  if (input.filters.name.length) {
    params.names = input.filters.name;
  }
  if (input.filters.skills.length) {
    params.skills = input.filters.skills;
  }
  if (input.filters.education.length) {
    params.education = input.filters.education;
  }
  if (input.filters.email.trim()) {
    params.email = input.filters.email.trim();
  }
  if (isExperienceFilterActive(input.filters, input.experienceBounds)) {
    params.experienceMin = input.filters.experience[0];
    params.experienceMax = input.filters.experience[1];
  }

  return params;
}

export function buildStudentExportParams(input: StudentListQueryInput): ListStudentsParams {
  const { page: _page, limit: _limit, ...params } = buildStudentListParams({
    ...input,
    page: 1,
    limit: input.limit ?? 10,
  });
  return params;
}

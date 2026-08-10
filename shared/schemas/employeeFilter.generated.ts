/**
 * AUTO-GENERATED — do not edit by hand.
 * Source: uat.dharwin.backend/src/schemas/employees/employeeFilter.schema.json
 * Regenerate: npm run generate:employee-filters (from backend repo)
 */

export type EmployeeCompensationType = 'paid' | 'unpaid';
export type EmployeeEmploymentStatus = 'current' | 'resigned' | 'all';

export type EmployeeFilters = {
  employmentStatus?: 'current' | 'resigned' | 'all';
  compensationType?: 'paid' | 'unpaid';
  search?: string;
  fullName?: string;
  email?: string;
  employeeId?: string;
  id?: string;
  agent?: string;
  agentIds?: string[];
};

export type EmployeeOperation = 'count' | 'list' | 'get' | 'aggregate' | 'search';

export type EmployeeStructuredQuery = {
  entity: 'employees';
  operations: EmployeeOperation[];
  filters?: EmployeeFilters;
  relations?: Array<{ entity: string; relation: string; id?: string; name?: string }>;
  scope?: { module?: string; projectId?: string; teamId?: string };
  pagination?: { page?: number; limit?: number };
  getAll?: boolean;
};

export const COMPENSATION_TYPE_OPTIONS: EmployeeCompensationType[] = ['paid', 'unpaid'];
export const EMPLOYMENT_STATUS_OPTIONS: EmployeeEmploymentStatus[] = ['current', 'resigned', 'all'];

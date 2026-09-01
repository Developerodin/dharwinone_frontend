import type { EvaluationDisplayStatus, EvaluationViewMode } from '@/shared/lib/api/evaluation'

export const EVALUATION_LIST_QUERY_KEYS = [
  'page',
  'pageSize',
  'status',
  'q',
  'course',
  'atRisk',
  'view',
  'sortBy',
  'sortOrder',
] as const

export type EvaluationListQueryKey = (typeof EVALUATION_LIST_QUERY_KEYS)[number]

export const DEFAULT_EVALUATION_PAGE_SIZE = 50

export const EVALUATION_PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const

const STATUS_VALUES: ReadonlyArray<'' | EvaluationDisplayStatus> = [
  '',
  'Completed',
  'In Progress',
  'Not Started',
]

export type EvaluationListState = {
  page: number
  pageSize: number
  status: '' | EvaluationDisplayStatus
  q: string
  course: string
  atRisk: boolean
  view: EvaluationViewMode
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export function parseEvaluationPage(raw: string | null | undefined): number {
  const n = Number.parseInt(String(raw ?? ''), 10)
  return Number.isInteger(n) && n >= 1 ? n : 1
}

export function parseEvaluationPageSize(raw: string | null | undefined): number {
  const n = Number.parseInt(String(raw ?? ''), 10)
  return (EVALUATION_PAGE_SIZE_OPTIONS as readonly number[]).includes(n)
    ? n
    : DEFAULT_EVALUATION_PAGE_SIZE
}

function parseEvaluationStatus(raw: string | null | undefined): '' | EvaluationDisplayStatus {
  const value = raw ?? ''
  return STATUS_VALUES.includes(value as '' | EvaluationDisplayStatus)
    ? (value as '' | EvaluationDisplayStatus)
    : ''
}

export function parseEvaluationListState(
  searchParams: Pick<URLSearchParams, 'get'>
): EvaluationListState {
  const sortOrder = searchParams.get('sortOrder') === 'desc' ? 'desc' : 'asc'
  return {
    page: parseEvaluationPage(searchParams.get('page')),
    pageSize: parseEvaluationPageSize(searchParams.get('pageSize')),
    status: parseEvaluationStatus(searchParams.get('status')),
    q: searchParams.get('q') ?? '',
    course: searchParams.get('course') ?? '',
    atRisk: searchParams.get('atRisk') === 'true',
    view: searchParams.get('view') === 'course' ? 'course' : 'student',
    sortBy: searchParams.get('sortBy') ?? '',
    sortOrder,
  }
}

export function normalizeEvaluationListQueryString(raw: string): string {
  if (!raw) return ''
  const params = new URLSearchParams(raw)
  const keys = [...new Set([...params.keys()])].sort()
  return keys.map((key) => `${key}=${params.get(key) ?? ''}`).join('&')
}

export function areEvaluationListQueryStringsEquivalent(a: string, b: string): boolean {
  return normalizeEvaluationListQueryString(a) === normalizeEvaluationListQueryString(b)
}

export function buildEvaluationListQueryString(state: EvaluationListState): string {
  const params = new URLSearchParams()
  const entries: Record<EvaluationListQueryKey, string | number | boolean> = {
    page: state.page,
    pageSize: state.pageSize,
    status: state.status,
    q: state.q.trim(),
    course: state.course,
    atRisk: state.atRisk,
    view: state.view,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
  }

  Object.entries(entries).forEach(([key, value]) => {
    if (key === 'page') {
      if (Number(value) > 1) params.set(key, String(value))
      return
    }
    if (key === 'pageSize') {
      if (Number(value) !== DEFAULT_EVALUATION_PAGE_SIZE) params.set(key, String(value))
      return
    }
    if (key === 'view') {
      if (value !== 'student') params.set(key, String(value))
      return
    }
    if (key === 'atRisk') {
      if (value === true) params.set(key, 'true')
      return
    }
    if (key === 'sortOrder') return
    if (key === 'sortBy') {
      if (value) {
        params.set('sortBy', String(value))
        params.set('sortOrder', state.sortOrder)
      }
      return
    }
    if (value) params.set(key, String(value))
  })

  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

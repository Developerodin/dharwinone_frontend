import { describe, expect, it } from 'vitest'
import {
  DEFAULT_EVALUATION_PAGE_SIZE,
  areEvaluationListQueryStringsEquivalent,
  buildEvaluationListQueryString,
  isEvaluationSortValidForView,
  parseEvaluationListState,
  parseEvaluationPage,
  parseEvaluationPageSize,
} from './evaluation-list-query'

describe('parseEvaluationPage', () => {
  it('defaults invalid values to 1', () => {
    expect(parseEvaluationPage(null)).toBe(1)
    expect(parseEvaluationPage('')).toBe(1)
    expect(parseEvaluationPage('0')).toBe(1)
    expect(parseEvaluationPage('abc')).toBe(1)
  })

  it('parses positive integers', () => {
    expect(parseEvaluationPage('2')).toBe(2)
    expect(parseEvaluationPage('2.9')).toBe(2)
  })
})

describe('parseEvaluationPageSize', () => {
  it('defaults invalid values to 50', () => {
    expect(parseEvaluationPageSize(null)).toBe(DEFAULT_EVALUATION_PAGE_SIZE)
    expect(parseEvaluationPageSize('15')).toBe(DEFAULT_EVALUATION_PAGE_SIZE)
  })

  it('accepts supported page sizes', () => {
    expect(parseEvaluationPageSize('25')).toBe(25)
    expect(parseEvaluationPageSize('100')).toBe(100)
  })
})

describe('parseEvaluationListState', () => {
  it('reads filters and pagination from search params', () => {
    const params = new URLSearchParams(
      'page=3&pageSize=25&status=Completed&q=Prakhar&course=c1&atRisk=true&view=course&sortBy=students&sortOrder=desc'
    )
    expect(parseEvaluationListState(params)).toEqual({
      page: 3,
      pageSize: 25,
      status: 'Completed',
      q: 'Prakhar',
      course: 'c1',
      atRisk: true,
      view: 'course',
      sortBy: 'students',
      sortOrder: 'desc',
    })
  })

  it('falls back to defaults for missing params', () => {
    expect(parseEvaluationListState(new URLSearchParams())).toEqual({
      page: 1,
      pageSize: DEFAULT_EVALUATION_PAGE_SIZE,
      status: '',
      q: '',
      course: '',
      atRisk: false,
      view: 'student',
      sortBy: '',
      sortOrder: 'asc',
    })
  })
})

describe('buildEvaluationListQueryString', () => {
  it('omits default page and pageSize', () => {
    expect(
      buildEvaluationListQueryString({
        page: 1,
        pageSize: DEFAULT_EVALUATION_PAGE_SIZE,
        status: '',
        q: '',
        course: '',
        atRisk: false,
        view: 'student',
        sortBy: '',
        sortOrder: 'asc',
      })
    ).toBe('')
  })

  it('serializes active filters and pagination', () => {
    const qs = buildEvaluationListQueryString({
      page: 2,
      pageSize: 25,
      status: 'In Progress',
      q: 'Prakhar',
      course: 'course-1',
      atRisk: true,
      view: 'course',
      sortBy: 'avgCompletion',
      sortOrder: 'desc',
    })
    expect(qs).toBe(
      '?page=2&pageSize=25&status=In+Progress&q=Prakhar&course=course-1&atRisk=true&view=course&sortBy=avgCompletion&sortOrder=desc'
    )
  })
})

describe('areEvaluationListQueryStringsEquivalent', () => {
  it('treats param order as equivalent', () => {
    expect(
      areEvaluationListQueryStringsEquivalent('page=2&q=test', 'q=test&page=2')
    ).toBe(true)
  })
})

describe('isEvaluationSortValidForView', () => {
  it('accepts sort ids for the active view only', () => {
    expect(isEvaluationSortValidForView('status', 'student')).toBe(true)
    expect(isEvaluationSortValidForView('status', 'course')).toBe(false)
    expect(isEvaluationSortValidForView('atRisk', 'course')).toBe(true)
    expect(isEvaluationSortValidForView('atRisk', 'student')).toBe(false)
    expect(isEvaluationSortValidForView('', 'student')).toBe(true)
  })
})

describe('parseEvaluationListState sort validation', () => {
  it('drops invalid sortBy for the selected view', () => {
    const params = new URLSearchParams('view=course&sortBy=status&sortOrder=desc')
    expect(parseEvaluationListState(params).sortBy).toBe('')
  })
})

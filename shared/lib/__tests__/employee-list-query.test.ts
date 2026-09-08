import { describe, expect, it } from 'vitest'
import {
  buildEmployeesListQueryParams,
  type EmployeeListFilterState,
} from '../ats/employee-list-query'

const baseFilters: EmployeeListFilterState = {
  agentIds: ['agent-1', 'agent-2'],
  employmentStatus: 'current',
  compensationType: 'paid',
  employmentType: 'Contract',
}

describe('buildEmployeesListQueryParams', () => {
  it('includes all active filter fields for list requests', () => {
    const params = buildEmployeesListQueryParams(baseFilters, {
      search: 'DBS-101',
      sortBy: 'fullName:asc',
      page: 2,
      limit: 100,
      includeOpenSopCount: true,
    })

    expect(params).toEqual({
      sortBy: 'fullName:asc',
      page: 2,
      limit: 100,
      includeOpenSopCount: '1',
      search: 'DBS-101',
      agentIds: 'agent-1,agent-2',
      employmentStatus: 'current',
      compensationType: 'paid',
      employmentType: 'Contract',
    })
  })

  it('omits compensationType when filter is All', () => {
    const params = buildEmployeesListQueryParams(
      { ...baseFilters, compensationType: '' },
      { sortBy: 'createdAt:desc' }
    )

    expect(params.compensationType).toBeUndefined()
    expect(params.employmentStatus).toBe('current')
  })

  it('sends employmentType independently of compensationType', () => {
    // The two are orthogonal: an unpaid freelancer is neither an intern nor a paid contractor,
    // so selecting one must not imply or clear the other.
    const params = buildEmployeesListQueryParams(
      { ...baseFilters, compensationType: 'unpaid', employmentType: 'Freelance' },
      {}
    )

    expect(params.compensationType).toBe('unpaid')
    expect(params.employmentType).toBe('Freelance')
  })

  it('omits employmentType when filter is All', () => {
    const params = buildEmployeesListQueryParams({ ...baseFilters, employmentType: '' }, {})

    expect(params.employmentType).toBeUndefined()
    expect(params.compensationType).toBe('paid')
  })

  it('export params mirror list filter keys without pagination or SOP count', () => {
    const listParams = buildEmployeesListQueryParams(baseFilters, {
      search: 'Jane',
      sortBy: 'joiningDate:desc',
      page: 1,
      limit: 100,
      includeOpenSopCount: true,
    })

    const exportParams = buildEmployeesListQueryParams(baseFilters, {
      search: 'Jane',
      sortBy: 'joiningDate:desc',
    })

    expect(exportParams).toEqual({
      sortBy: 'joiningDate:desc',
      search: 'Jane',
      agentIds: 'agent-1,agent-2',
      employmentStatus: 'current',
      compensationType: 'paid',
      employmentType: 'Contract',
    })
    expect(exportParams.page).toBeUndefined()
    expect(exportParams.limit).toBeUndefined()
    expect(exportParams.includeOpenSopCount).toBeUndefined()

    for (const key of [
      'search',
      'agentIds',
      'employmentStatus',
      'compensationType',
      'employmentType',
      'sortBy',
    ] as const) {
      expect(exportParams[key]).toEqual(listParams[key])
    }
  })
})

import { describe, expect, it } from 'vitest'
import {
  readJobFiltersFromQuery,
  writeJobFiltersToQuery,
  type JobSidebarFilters,
} from '../ats/job-list-filters'

const DEFAULTS: JobSidebarFilters = {
  jobTitle: [],
  company: [],
  location: [],
  experience: [0, 20],
  salary: [0, 200000],
  salaryNotSpecified: false,
  status: 'Active',
  postingDate: '',
}

const roundTrip = (filters: JobSidebarFilters): JobSidebarFilters => {
  const params = new URLSearchParams()
  writeJobFiltersToQuery(params, filters, DEFAULTS)
  return readJobFiltersFromQuery(params, DEFAULTS)
}

describe('job list filters <-> URL', () => {
  it('writes nothing for an untouched list', () => {
    const params = new URLSearchParams()
    writeJobFiltersToQuery(params, DEFAULTS, DEFAULTS)
    expect(params.toString()).toBe('')
  })

  it('round-trips a fully populated filter set', () => {
    const filters: JobSidebarFilters = {
      jobTitle: ['Engineer', 'Analyst'],
      company: ['Acme'],
      location: ['Remote'],
      experience: [2, 8],
      salary: [50000, 90000],
      salaryNotSpecified: false,
      status: 'Draft',
      postingDate: '2026-01-31',
    }
    expect(roundTrip(filters)).toEqual(filters)
  })

  it('round-trips salaryNotSpecified and status=all', () => {
    const filters: JobSidebarFilters = {
      ...DEFAULTS,
      salaryNotSpecified: true,
      status: 'all',
    }
    expect(roundTrip(filters)).toEqual(filters)
  })

  it('clears params that fall back to their default', () => {
    const params = new URLSearchParams('titles=Engineer&expMin=3&status=Draft&page=4')
    writeJobFiltersToQuery(params, DEFAULTS, DEFAULTS)
    expect(params.get('titles')).toBeNull()
    expect(params.get('expMin')).toBeNull()
    expect(params.get('status')).toBeNull()
    // Non-filter params are left alone for the caller to manage.
    expect(params.get('page')).toBe('4')
  })

  it('accepts a lowercase ?status= and falls back on junk numbers', () => {
    const params = new URLSearchParams('status=archived&expMin=notanumber')
    const filters = readJobFiltersFromQuery(params, DEFAULTS)
    expect(filters.status).toBe('Archived')
    expect(filters.experience[0]).toBe(DEFAULTS.experience[0])
  })
})

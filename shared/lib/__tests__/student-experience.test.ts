import { describe, expect, it } from 'vitest'
import { calculateStudentExperienceYears } from '../training/student-experience'

const NOW = new Date('2026-06-01T00:00:00.000Z')

describe('calculateStudentExperienceYears', () => {
  it('returns 0 for empty or missing experience', () => {
    expect(calculateStudentExperienceYears([], NOW)).toBe(0)
    expect(calculateStudentExperienceYears(undefined, NOW)).toBe(0)
  })

  it('counts completed roles with start and end dates', () => {
    const years = calculateStudentExperienceYears(
      [{ startDate: '2020-01-01', endDate: '2022-01-01', isCurrent: false }],
      NOW
    )
    expect(years).toBe(2)
  })

  it('uses now for current roles without endDate', () => {
    const years = calculateStudentExperienceYears(
      [{ startDate: '2024-06-01', isCurrent: true }],
      NOW
    )
    expect(years).toBe(2)
  })

  it('prefers endDate over isCurrent when both are set', () => {
    const years = calculateStudentExperienceYears(
      [{ startDate: '2020-01-01', endDate: '2021-01-01', isCurrent: true }],
      NOW
    )
    expect(years).toBe(1)
  })

  it('sums multiple roles', () => {
    const years = calculateStudentExperienceYears(
      [
        { startDate: '2018-01-01', endDate: '2020-01-01' },
        { startDate: '2021-01-01', endDate: '2023-01-01' },
      ],
      NOW
    )
    expect(years).toBe(4)
  })

  it('skips roles missing startDate or a valid end', () => {
    const years = calculateStudentExperienceYears(
      [
        { endDate: '2020-01-01' },
        { startDate: '2020-01-01' },
      ],
      NOW
    )
    expect(years).toBe(0)
  })
})

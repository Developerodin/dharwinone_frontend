import { describe, expect, it } from 'vitest'
import { buildPaginationItems, getPaginationRange } from './evaluation-pagination'

describe('getPaginationRange', () => {
  it('returns 0..0 when total is 0', () => {
    expect(getPaginationRange(0, 1, 50)).toEqual({ start: 0, end: 0 })
  })

  it('calculates first page range', () => {
    expect(getPaginationRange(145, 1, 50)).toEqual({ start: 1, end: 50 })
  })

  it('calculates middle page range', () => {
    expect(getPaginationRange(145, 2, 50)).toEqual({ start: 51, end: 100 })
  })

  it('calculates last partial page range', () => {
    expect(getPaginationRange(145, 3, 50)).toEqual({ start: 101, end: 145 })
  })
})

describe('buildPaginationItems', () => {
  it('returns all pages when page count is 7 or fewer', () => {
    expect(buildPaginationItems(0, 3)).toEqual([
      { type: 'page', page: 0 },
      { type: 'page', page: 1 },
      { type: 'page', page: 2 },
    ])
  })

  it('includes ellipsis windows for large page counts', () => {
    const items = buildPaginationItems(5, 12)
    expect(items[0]).toEqual({ type: 'page', page: 0 })
    expect(items).toContainEqual({ type: 'ellipsis' })
    expect(items[items.length - 1]).toEqual({ type: 'page', page: 11 })
  })
})

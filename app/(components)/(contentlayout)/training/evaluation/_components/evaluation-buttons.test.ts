import { describe, expect, it } from 'vitest'
import { EVAL_PAGE_LINK, EVAL_PAGE_LINK_ACTIVE, evalPageLinkClass } from './evaluation-buttons'

describe('evalPageLinkClass', () => {
  it('returns inactive link classes for non-current pages', () => {
    expect(evalPageLinkClass(false)).toBe(EVAL_PAGE_LINK)
    expect(evalPageLinkClass(false)).not.toContain('active')
  })

  it('returns active link classes with visual and a11y hooks for current page', () => {
    const active = evalPageLinkClass(true)
    expect(active).toBe(EVAL_PAGE_LINK_ACTIVE)
    expect(active).toContain('active')
    expect(active).toContain('font-semibold')
    expect(active).toContain('!bg-primary')
    expect(active).toContain('!text-white')
  })
})

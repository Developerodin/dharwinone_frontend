import { describe, expect, it } from 'vitest'
import { buildStudentProfileShareUrl } from '../training/student-share'

describe('buildStudentProfileShareUrl', () => {
  it('adds view query param to the students list URL', () => {
    const url = buildStudentProfileShareUrl('abc123', 'https://app.example.com/training/students?page=2')
    expect(url).toBe('https://app.example.com/training/students?page=2&view=abc123')
  })

  it('replaces an existing view param', () => {
    const url = buildStudentProfileShareUrl('new-id', 'https://app.example.com/training/students?view=old-id')
    expect(url).toBe('https://app.example.com/training/students?view=new-id')
  })
})

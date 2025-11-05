import { describe, it, expect } from 'vitest'
import { calculate } from './stringCalculator'

describe('String Calculator', () => {
    it('returns 0 for empty string', () => {
        expect(calculate('')).toBe(0)
    })
})
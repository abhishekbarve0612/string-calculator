import { describe, it, expect } from 'vitest'
import { calculate } from './stringCalculator'

describe('String Calculator', () => {
    it('returns 0 for empty string', () => {
        expect(calculate('')).toBe(0)
    })

    it('returns NaN if an operator is present', () => {
        expect(calculate('1+2')).toBe(NaN)
        expect(calculate('1-2')).toBe(NaN)
        expect(calculate('1*2')).toBe(NaN)
        expect(calculate('1/2')).toBe(NaN)
        expect(calculate('1%2')).toBe(NaN)
        expect(calculate('1^2')).toBe(NaN)
    })

    it('returns the number itself if it is a single number', () => {
        expect(calculate('1')).toBe(1)
        expect(calculate('23')).toBe(23)
    })
})
import { describe, it, expect } from 'vitest'
import { calculate, getOperandsAndOperator } from './stringCalculator'

describe('getOperandsAndOperator helper function', () => {
    it('returns the operands and operator if an operator is present', () => {
        expect(getOperandsAndOperator('1+2')).toEqual([1, 2, '+'])
        expect(getOperandsAndOperator('1-2')).toEqual([1, 2, '-'])
        expect(getOperandsAndOperator('1*2')).toEqual([1, 2, '*'])
        expect(getOperandsAndOperator('1/2')).toEqual([1, 2, '/'])
        expect(getOperandsAndOperator('1%2')).toEqual([1, 2, '%'])
        expect(getOperandsAndOperator('1^2')).toEqual([1, 2, '^'])
    })
})

describe('String Calculator', () => {
    it('returns 0 for empty string', () => {
        expect(calculate('')).toBe(0)
        expect(calculate('   ')).toBe(0)
    })

    it('returns NaN if an operator is present', () => {
        expect(calculate('  1+2')).toBe(NaN)
        expect(calculate('1-2   ')).toBe(NaN)
        expect(calculate('    1*2    ')).toBe(NaN)
        expect(calculate('1/2')).toBe(NaN)
        expect(calculate('1%2')).toBe(NaN)
        expect(calculate('1^2')).toBe(NaN)
    })

    it('returns the number itself if it is a single number', () => {
        expect(calculate('1')).toBe(1)
        expect(calculate('23')).toBe(23)
    })
})
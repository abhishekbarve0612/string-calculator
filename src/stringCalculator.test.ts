import { describe, it, expect } from 'vitest'
import { calculate, calculateNumbers, getOperandsAndOperator, type Operator } from './stringCalculator'

describe('getOperandsAndOperator helper function', () => {
    it('returns the operands and operator if an operator is present', () => {
        expect(getOperandsAndOperator('1+2')).toEqual([1, 2, '+'])
        expect(getOperandsAndOperator('1-2')).toEqual([1, 2, '-'])
        expect(getOperandsAndOperator('1*2')).toEqual([1, 2, '*'])
        expect(getOperandsAndOperator('1/2')).toEqual([1, 2, '/'])
        expect(getOperandsAndOperator('1%2')).toEqual([1, 2, '%'])
        expect(getOperandsAndOperator('1^2')).toEqual([1, 2, '^'])
    })

    it('handles signed operands', () => {
        expect(getOperandsAndOperator('-1')).toEqual([-1, 0, ''])
        expect(getOperandsAndOperator('-1+2')).toEqual([-1, 2, '+'])
        expect(getOperandsAndOperator('1+-2')).toEqual([1, -2, '+'])
        expect(getOperandsAndOperator('1--2')).toEqual([1, -2, '-'])
        expect(getOperandsAndOperator('1*-2')).toEqual([1, -2, '*'])
        expect(getOperandsAndOperator('1/-2')).toEqual([1, -2, '/'])
        expect(getOperandsAndOperator('1%2')).toEqual([1, 2, '%'])
        expect(getOperandsAndOperator('1^-2')).toEqual([1, -2, '^'])
    })
})

describe('calculateNumbers helper function', () => {
    it('returns the calculated result if an operator is present', () => {
        expect(calculateNumbers(1, 2, '+')).toBe(3)
        expect(calculateNumbers(1, 2, '-')).toBe(-1)
        expect(calculateNumbers(1, 2, '*')).toBe(2)
        expect(calculateNumbers(1, 2, '/')).toBe(0.5)
        expect(calculateNumbers(1, 2, '%')).toBe(1)
        expect(calculateNumbers(2, 3, '^')).toBe(8)
    })

    it('throws an error if an invalid operator is present', () => {
        expect(() => calculateNumbers(1, 2, 'a' as Operator)).toThrow('Invalid operator: a')
    })
})

describe('String Calculator', () => {
    it('returns 0 for empty string', () => {
        expect(calculate('')).toBe(0)
        expect(calculate('   ')).toBe(0)
    })

    it('returns calculated result if an operator is present', () => {
        expect(calculate('  1+2')).toBe(3)
        expect(calculate('4.5+5.2')).toBe(9.7)
        expect(calculate('1-2   ')).toBe(-1)
        expect(calculate('    1*2    ')).toBe(2)
        expect(calculate('1/2')).toBe(0.5)
        expect(calculate('40%7')).toBe(5)
        expect(calculate('3^2')).toBe(9)
    })

    it('returns the number itself if it is a single number', () => {
        expect(calculate('1')).toBe(1)
        expect(calculate('23')).toBe(23)
    })
})
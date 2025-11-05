const OPERATORS = /[+\-*/%^]/

export function getOperandsAndOperator(input: string): [operand1: number, operand2: number, operator: string] {
    const trimmedInput = input.trim()
    if (!OPERATORS.test(trimmedInput)) {
        return [Number(trimmedInput), 0, '']
    }
    const operands = trimmedInput.split(OPERATORS)
    const operator = trimmedInput.match(OPERATORS)?.[0] ?? ''
    return [Number(operands[0]), Number(operands[1]), operator]
}

export function calculate(input: string): number {
    const trimmedInput = input.trim()
    if (trimmedInput === '') {
        return 0
    }
    if (OPERATORS.test(trimmedInput)) {
        return NaN
    }

    return Number(trimmedInput)
}
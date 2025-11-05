const OPERATORS = /[+\-*/%^]/
export type Operator = '+' | '-' | '*' | '/' | '%' | '^' | ''

export function getOperandsAndOperator(input: string): [operand1: number, operand2: number, operator: Operator] {
    const trimmedInput = input.trim()
    if (!OPERATORS.test(trimmedInput)) {
        return [Number(trimmedInput), 0, '']
    }
    const operands = trimmedInput.split(OPERATORS)
    const operator = (trimmedInput.match(OPERATORS)?.[0] ?? '') as Operator
    return [Number(operands[0]), Number(operands[1]), operator]
}


export function calculateNumbers(operand1: number, operand2: number, operator: Operator): number {
    switch (operator) {
        case '+':
            return operand1 + operand2
        case '-':
            return operand1 - operand2
        case '*':
            return operand1 * operand2
        case '/':
            return operand1 / operand2
        case '%':
            return operand1 % operand2
        case '^':
            return operand1 ** operand2
        default:
            throw new Error(`Invalid operator: ${operator}`)
    }
}

export function calculate(input: string): number {
    const trimmedInput = input.trim()
    if (trimmedInput === '') {
        return 0
    }
    if (OPERATORS.test(trimmedInput)) {
        return calculateNumbers(...getOperandsAndOperator(trimmedInput))
    }

    return Number(trimmedInput)
}
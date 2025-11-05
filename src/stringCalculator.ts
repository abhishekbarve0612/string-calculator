const OPERATORS = /[+\-*/%^]/
export type Operator = '+' | '-' | '*' | '/' | '%' | '^' | ''

export function getOperandsAndOperator(input: string): [operand1: number, operand2: number, operator: Operator] {
    const trimmedInput = input.trim()
    const hasLeadingSign = trimmedInput.startsWith('+') || trimmedInput.startsWith('-')
    const isNegative = hasLeadingSign && trimmedInput.startsWith('-')
    const unsignedInput = hasLeadingSign ? trimmedInput.slice(1) : trimmedInput
    if (!OPERATORS.test(unsignedInput)) {
        return [Number(trimmedInput), 0, '']
    }
    const operatorIndex = unsignedInput.search(OPERATORS)
    const operator = unsignedInput[operatorIndex] as Operator
    const operand1 = isNegative ? -Number(unsignedInput.slice(0, operatorIndex)) : Number(unsignedInput.slice(0, operatorIndex))
    const operand2 = Number(unsignedInput.slice(operatorIndex + 1))
    if (Number.isNaN(operand1) || Number.isNaN(operand2)) {
        throw new Error('Invalid expression')
    }
    return [operand1, operand2, operator]
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
            if (operand2 === 0) {
                throw new Error('Division by zero')
            }
            return operand1 / operand2
        case '%':
            return operand1 % operand2
        case '^':
            return operand1 ** operand2
        case '':
            return operand1
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


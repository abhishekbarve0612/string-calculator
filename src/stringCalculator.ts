const OPERATORS = ['+', '-', '*', '/', '%', '^']

export function calculate(input: string): number {
    if (input === '') {
        return 0
    }
    const isOperatorPresent = OPERATORS.some(operator => input.includes(operator))
    if (isOperatorPresent) {
        return NaN
    }
    return Number(input)
}
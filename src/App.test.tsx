import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
    it('renders the app', () => {
        render(<App />);
    })

    it('renders a form, input, submit button, and output', () => {
        render(<App />);
        expect(screen.getByRole('form')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
        expect(screen.getByRole('status')).toBeInTheDocument();
    })

    it('computes an expression when the form is submitted', async () => {
        const user = userEvent.setup()
        render(<App />)

        await user.type(screen.getByRole('textbox'), '1+2\n3-4\n5*6')
        await user.click(screen.getByRole('button', { name: /calculate/i }))
        expect(screen.getByRole('status')).toHaveTextContent('3, -1, 30')
    })

    it('allows keyboard submit (Enter key)', async () => {
        const user = userEvent.setup()
        render(<App />)

        const textarea = screen.getByRole('textbox')
        const button = screen.getByRole('button', { name: /calculate/i })
        await user.clear(textarea)
        await user.type(textarea, '1--2\n30  /   2\n20%6    ')

        button.focus()
        await user.keyboard('{Enter}')
        expect(screen.getByRole('status')).toHaveTextContent('3, 15, 2')
    })

    it('allows textarea to submit on Enter key without shift key', async () => {
        const user = userEvent.setup()
        render(<App />)

        const textarea = screen.getByRole('textbox')
        await user.clear(textarea)
        await user.type(textarea, '1+2\n3-4\n5*6')
        await user.keyboard('{Enter}')
        expect(screen.getByRole('status')).toHaveTextContent('3, -1, 30')
    })

    it('shows an error message when tried to divide by zero', async () => {
        const user = userEvent.setup()
        render(<App />)

        const form = screen.getByRole('form')
        const textarea = screen.getByRole('textbox')
        const button = screen.getByRole('button', { name: /calculate/i })

        await user.clear(textarea)
        await user.type(textarea, '1/0')

        button.focus()
        await user.keyboard('{Enter}')

        const formAlert = within(form).getByRole('alert')
        expect(formAlert).toHaveTextContent('Division by zero')
        expect(screen.getByRole('status')).toHaveTextContent('')
    })

    it('shows an error for invalid expression', async () => {
        const user = userEvent.setup()
        render(<App />)

        const form = screen.getByRole('form')
        const textarea = screen.getByRole('textbox')
        const button = screen.getByRole('button', { name: /calculate/i })

        await user.clear(textarea)
        await user.type(textarea, '1+2+3+')

        button.focus()
        await user.keyboard('{Enter}')

        const formAlert = within(form).getByRole('alert')
        expect(formAlert).toHaveTextContent('Invalid expression')
        expect(textarea).toHaveAttribute('aria-invalid', 'true')
        expect(textarea).toHaveAttribute('aria-errormessage', 'error-message')
        expect(screen.getByRole('status')).toHaveTextContent('')
    })

    it('checks for accessibility', () => {
        render(<App />)

        const form = screen.getByRole('form')
        expect(form).toBeInTheDocument()

        const textarea = screen.getByRole('textbox')
        expect(textarea).toBeInTheDocument()
        expect(textarea).toHaveAttribute('aria-describedby', 'rules-list')
        expect(textarea).toHaveAttribute('aria-invalid', 'false')
        expect(textarea).not.toHaveAttribute('aria-errormessage')

        const button = screen.getByRole('button', { name: /calculate/i })
        expect(button).toBeInTheDocument()
        expect(button).toBeDisabled()

        const result = screen.getByRole('status')
        expect(result).toBeInTheDocument()
        expect(result).toHaveTextContent('')

    })
})

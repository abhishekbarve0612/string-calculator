import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
        expect(screen.getByRole('output')).toBeInTheDocument();
    })

    it('computes an expression when the form is submitted', async () => {
        const user = userEvent.setup()
        render(<App />)

        await user.type(screen.getByRole('textbox'), '1+2\n3-4\n5*6')
        await user.click(screen.getByRole('button', { name: /calculate/i }))
        expect(screen.getByRole('output')).toHaveTextContent('3, -1, 30')
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
        expect(screen.getByRole('output')).toHaveTextContent('3, 15, 2')
    })
})

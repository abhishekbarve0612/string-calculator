import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
    })
})

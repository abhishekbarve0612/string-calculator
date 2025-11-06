import { useState } from 'react';
import { calculate } from './stringCalculator';

import styles from './App.module.css';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textInput = input;
    const textStrings = textInput.split('\n');
    try {
      const results = textStrings.map((textString: string) => calculate(textString));
      setResult(results.join(', '));
      setError('');
    } catch (error: unknown) {
      setError((error as Error)?.message ?? 'An unknown error occurred');
      setResult('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if (form) {
        form.requestSubmit();
      }
    } else if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setInput(input + '\n');
    }
  }

  return (
    <main className={styles.main}>
      <img
        src='https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        width={600}
        height={400}
        alt='Ball of yarn — pun for the string calculator'
        className={styles.image}
      />

      <section className={styles.section}>

        <h1>String Calculator</h1>


        <form aria-label='calculator form' onSubmit={handleCalculate} className={styles.form}>

          <section aria-labelledby='rules-heading' id='rules'>
            <h2 id='rules-heading'>Rules for valid input</h2>
            <ul id='rules-list'>
              <li>Only numbers and operators are allowed</li>
              <li>Operators are +, -, *, /, %, ^</li>
              <li>Expressions are separated by new lines</li>
              <li>Not more than two operands are allowed in a single expression</li>
              <li>Can use signed operands</li>
              <li>Do not use parentheses, brackets, or other grouping symbols</li>
              <li>Use shift+Enter to add a new line</li>
            </ul>
          </section>

          <label htmlFor='text-input' className={styles.label}>Enter numbers</label>

          <textarea
            id='text-input'
            name='text-input'
            className={styles.textarea}
            placeholder='Enter numbers'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-describedby='rules-list'
            aria-invalid={Boolean(error)}
            aria-errormessage={error ? 'error-message' : undefined}
            onKeyDown={handleKeyDown}
            rows={5}
          />

          {error && <p id='error-message' role='alert' className={styles.error}>{error}</p>}

          <button
            type='submit'
            disabled={input.trim() === ''}
            className={styles.button}
          >
            Calculate
          </button>

        </form>

        <label htmlFor='result' className={styles.label}>Result:</label>
        <output id='result' role='status'>
          {result !== null && <p className={styles.result}>{result}</p>}
        </output>

        <div role='note'>
          <p>Make sure you enter numbers correctly!</p>
        </div>

      </section>
    </main>
  );
};

export default App;

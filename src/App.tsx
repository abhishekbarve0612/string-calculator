import { useState } from 'react';
import { calculate } from './stringCalculator';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string>('');

  const handleCalculate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textInput = input;
    const textStrings = textInput.split('\n');
    const results = textStrings.map((textString: string) => calculate(textString));
    setResult(results.join(', '));
  };

  return (
    <main style={{ padding: '20px', backgroundColor: '#fff', color: '#aaa' }}>
      <img
        src='https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        width={600}
        height={400}
        alt='representing a bundle of strings'
      />

      <h1>String Calculator</h1>

      <form aria-label='calculator form' onSubmit={handleCalculate}>
        <label htmlFor='text-input' style={{ fontSize: '20px' }}>Enter numbers</label>

        <textarea
          id='text-input'
          name='text-input'
          style={{ margin: '10px 0', color: '#aaa' }}
          placeholder='Enter numbers'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          type='submit'
          style={{
            padding: '10px',
            backgroundColor: '#008cba',
            color: '#fff',
            border: 'none',
          }}>
          Calculate
        </button>

      </form>

      <label htmlFor='result' style={{ fontSize: '20px' }}>Result</label>
      <output id='result' role='output' aria-live='polite'>
        {result !== null && <p style={{ color: 'green' }}>{result}</p>}
      </output>

      <div role='alert'>
        <p>Make sure you enter numbers correctly!</p>
      </div>
    </main>
  );
};

export default App;

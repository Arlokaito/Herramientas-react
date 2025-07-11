import React, { useState, useEffect } from 'react';
import './Calculadora.css';

const Calculadora = () => {
  const [input, setInput] = useState('');

  // Maneja clics en botones
  const handleClick = (value) => {
    // Bloquear operadores duplicados (excepto paréntesis)
    const operadores = ['+', '-', '*', '/'];
    const lastChar = input.slice(-1);

    if (
      operadores.includes(value) &&
      (input === '' || operadores.includes(lastChar))
    ) {
      return;
    }

    setInput((prev) => prev + value);
  };

  const handleClear = () => setInput('');
  const handleBackspace = () => setInput((prev) => prev.slice(0, -1));

  const handleEqual = () => {
    try {
      const parsed = input.replace(/(\d+)%/g, (_, num) => `(${num}/100)`); // reemplaza "50%" por "(50/100)"
      const result = eval(parsed);
      setInput(result.toString());
    } catch {
      setInput('Error');
    }
  };

  // Teclado físico
  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key;

      if (!isNaN(key) || ['+', '-', '*', '/', '(', ')', '.'].includes(key)) {
        handleClick(key);
      } else if (key === 'Enter') {
        e.preventDefault();
        handleEqual();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Escape') {
        handleClear();
      } else if (key === '%') {
        handleClick('%');
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [input]);

  return (
    <div className="calculadora">
      <h2>Calculadora</h2>
      <input type="text" value={input} readOnly className="calculadora-display" />

      <div className="calculadora-buttons">
        <button onClick={handleClear}>C</button>
        <button onClick={handleBackspace}>←</button>
        <button onClick={() => handleClick('%')}>%</button>
        <button onClick={() => handleClick('/')}>/</button>

        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')}>*</button>

        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>

        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')}>+</button>

        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('(')}>(</button>
        <button onClick={() => handleClick(')')}>)</button>

        <button onClick={handleEqual} className="equal">=</button>
      </div>
    </div>
  );
};

export default Calculadora;

// Importa React y los hooks useState y useEffect desde la librería de React
import React, { useState, useEffect } from 'react';
// Importa el archivo CSS específico de esta calculadora
import './Calculadora.css';


// Componente funcional principal de la calculadora
const Calculadora = () => {
  // Estado que guarda el valor actual que se muestra en pantalla (input del usuario)
  const [input, setInput] = useState('');

  // Función que se ejecuta al hacer clic en un botón de número u operador
  const handleClick = (value) => {
    // Define una lista de operadores básicos
    const operadores = ['+', '-', '*', '/'];
    // Obtiene el último carácter del input actual
    const lastChar = input.slice(-1);
    
    // Si el valor es un operador y:
    // - el input está vacío, o
    // - el último carácter también es un operador
    // Entonces no se permite agregar otro operador (para evitar duplicados)
    if (
      operadores.includes(value) &&
      (input === '' || operadores.includes(lastChar))
    ) {
      return; // No hace nada
    }

    // Agrega el nuevo valor al final del input actual
    setInput((prev) => prev + value);
  };

  // Limpia completamente el input (botón "C")
  const handleClear = () => setInput('');
  // Borra el último carácter del input (botón "←")
  const handleBackspace = () => setInput((prev) => prev.slice(0, -1));

  // Calcula el resultado de la operación (botón "=")
  const handleEqual = () => {
    try {
      // Reemplaza los porcentajes como "50%" por "(50/100)" para que eval los entienda
      const parsed = input.replace(/(\d+)%/g, (_, num) => `(${num}/100)`); // reemplaza "50%" por "(50/100)"
      // Evalúa la operación matemática como string (ej: "5+2" → 7)
      const result = eval(parsed);
      // Convierte el resultado a string y lo muestra
      setInput(result.toString());
    } catch {
      // Si ocurre un error (por ejemplo, expresión inválida), muestra "Error"
      setInput('Error');
    }
  };

  // Hook para detectar teclas presionadas en el teclado físico
  useEffect(() => {
    // Función que se activa al presionar una tecla
    const handleKey = (e) => {
      const key = e.key;

      // Si la tecla es un número o un operador permitido
      if (!isNaN(key) || ['+', '-', '*', '/', '(', ')', '.'].includes(key)) {
        handleClick(key);
      } 
      // Si la tecla es Enter, ejecuta el cálculo
      else if (key === 'Enter') {
        e.preventDefault(); // Previene el comportamiento por defecto (como enviar formularios)
        handleEqual();
      } 
      // Si la tecla es Backspace, borra el último carácter
      else if (key === 'Backspace') {
        handleBackspace();
      } 
      // Si la tecla es Escape, limpia todo
      else if (key === 'Escape') {
        handleClear();
      } 
      // Si se presiona %, se añade al input
      else if (key === '%') {
        handleClick('%');
      }
    };

    // Agrega el listener de evento al cargar el componente
    window.addEventListener('keydown', handleKey);
    // Elimina el listener al desmontar el componente o actualizar dependencias
    return () => window.removeEventListener('keydown', handleKey);
  }, [input]); // El efecto se actualiza cada vez que cambia `input`

  // Renderiza la interfaz de la calculadora
  return (
    <div className="calculadora">
      <h2>Calculadora</h2>
       {/* Muestra el input del usuario en un campo de solo lectura */}
      <input type="text" value={input} readOnly className="calculadora-display" />

      {/* Contenedor de los botones */}
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

// Exporta el componente para ser usado en App.js u otro lugar
export default Calculadora;

import React, { useState, useEffect  } from 'react';
import Navbar from './components/Navbar';
import Calculadora from './components/Calculadora';
import Todolist from './components/Todolist';
import GeneradorContrasenia from './components/GeneradorContrasenia';
import Conversor from './components/Conversor';
import './App.css';

function App() {
  const [currentTool, setCurrentTool] = useState('Calculadora');
  const [todoTasks, setTodoTasks] = useState([]);
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Aplica la clase en <body> cuando cambia el modo
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  // Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('todoTasks');
    if (stored) setTodoTasks(JSON.parse(stored));
  }, []);

  // Guardar tareas
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
  }, [todoTasks]);

  // Cargar contraseñas guardadas desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('savedPasswords');
    if (stored) setSavedPasswords(JSON.parse(stored));
  }, []);

  // Guardar contraseñas en localStorage
  useEffect(() => {
    localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
  }, [savedPasswords]);

  const renderTool = () => { /* Genera el renderizado de todos los componentes */
    switch (currentTool) {
      case 'Calculadora': return <Calculadora />;
      case 'ToDo': return <Todolist tasks={todoTasks} setTasks={setTodoTasks} />;
      case 'Contraseñas': return <GeneradorContrasenia savedPasswords={savedPasswords} setSavedPasswords={setSavedPasswords} />;
      case 'Conversor': return <Conversor />;
      default: return <Calculadora />;
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar
        setTool={setCurrentTool}
        currentTool={currentTool}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <main className="tool-container"> {renderTool()} </main>
    </div>
  );
}

export default App;
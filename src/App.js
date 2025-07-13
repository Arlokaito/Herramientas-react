// Importamos React y sus hooks useState y useEffect
import React, { useState, useEffect  } from 'react';

// Importamos los componentes de herramientas
import Navbar from './components/Navbar';
import Calculadora from './components/Calculadora';
import Todolist from './components/Todolist';
import GeneradorContrasenia from './components/GeneradorContrasenia';
import Conversor from './components/Conversor';

// Importamos el archivo de estilos principal de la app
import './App.css';

// Componente principal de la aplicación
function App() {

  // Estado que indica qué herramienta está activa actualmente
  const [currentTool, setCurrentTool] = useState('Calculadora');
  
  // Estado que almacena las tareas del To-Do list
  const [todoTasks, setTodoTasks] = useState([]);
  
  // Estado que guarda las contraseñas generadas y almacenadas
  const [savedPasswords, setSavedPasswords] = useState([]);
  
  // Estado que indica si el modo oscuro está activo o no
  const [darkMode, setDarkMode] = useState(false);

   // Efecto que cambia la clase del <body> para aplicar el modo oscuro o claro
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  // Carga inicial de tareas guardadas en localStorage (cuando se monta el componente)
  useEffect(() => {
    const stored = localStorage.getItem('todoTasks');
    if (stored) setTodoTasks(JSON.parse(stored));
  }, []);

  // Guarda las tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
  }, [todoTasks]);

  // Carga inicial de contraseñas guardadas desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('savedPasswords');
    if (stored) setSavedPasswords(JSON.parse(stored));
  }, []);

  // Guarda las contraseñas generadas cuando cambian
  useEffect(() => {
    localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
  }, [savedPasswords]);

  // Función que determina qué componente mostrar según la herramienta seleccionada
  const renderTool = () => {
    switch (currentTool) {
      case 'Calculadora': return <Calculadora />;
      case 'ToDo': return <Todolist tasks={todoTasks} setTasks={setTodoTasks} />;
      case 'Contraseñas': return <GeneradorContrasenia savedPasswords={savedPasswords} setSavedPasswords={setSavedPasswords} />;
      case 'Conversor': return <Conversor />;
      default: return <Calculadora />;
    }
  };

  // Render principal de la app
  return (
    // Se asigna la clase App y también la clase de modo actual (oscuro o claro)
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Barra de navegación con props para cambiar de herramienta y modo oscuro */}
      <Navbar
        setTool={setCurrentTool}
        currentTool={currentTool}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Renderiza el componente correspondiente en función de la herramienta activa */}
      <main className="tool-container"> {renderTool()} </main>
    </div>
  );
}

// Exporta el componente para poder usarlo en index.js
export default App;

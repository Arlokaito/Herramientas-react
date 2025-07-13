// Importa React (necesario para usar JSX)
import React from "react";
// Importa el archivo de estilos para la barra de navegación
import './Navbar.css';

// Componente funcional Navbar que recibe props:
// setTool → función para cambiar la herramienta activa
// currentTool → herramienta actualmente activa
// darkMode → booleano que indica si el modo oscuro está activado
// setDarkMode → función para alternar entre modo claro y oscuro
const Navbar = ({ setTool, currentTool, darkMode, setDarkMode }) => {
    return (
        // Contenedor principal de la barra de navegación
        // Aplica la clase "navbar" y si darkMode está activado también agrega la clase "dark"
        <nav className={`navbar ${darkMode ? "dark" : ""}`}>
            
            {/* Contenedor de los botones de herramientas */}
            <div className="tool-buttons">
                {/* Mapea las herramientas disponibles para crear un botón por cada una */}
                {["Calculadora", "ToDo", "Contraseñas", "Conversor"].map((name) => (
                    <button
                        key={name}
                        onClick={() => setTool(name)}
                        className={`nav-button ${currentTool === name ? "active" : ""}`}
                    >
                        {name}
                    </button>
                ))}
            </div>

            {/* Botón para cambiar entre modo claro y oscuro */}
            <button
                onClick={() => setDarkMode((prev) => !prev)}
                className="nav-button"
            >
                {darkMode ? "☀️" : "🌙"}
            </button>
        </nav>
    );
};

// Exporta el componente para que pueda usarse en otros archivos (por ejemplo en App.js)
export default Navbar;

import React from "react";
import './Navbar.css'; // Asegúrate de crear este archivo

const Navbar = ({ setTool, currentTool, darkMode, setDarkMode }) => {
    return (
        <nav className={`navbar ${darkMode ? "dark" : ""}`}>
            <div className="tool-buttons">
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

            <button
                onClick={() => setDarkMode((prev) => !prev)}
                className="nav-button"
            >
                {darkMode ? "☀️" : "🌙"}
            </button>
        </nav>
    );
};

export default Navbar;

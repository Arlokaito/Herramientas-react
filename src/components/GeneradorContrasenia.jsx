// Importa React y los hooks useState y useEffect
import React, { useState, useEffect } from 'react';
// Importa los estilos específicos para este componente
import './GeneradorContrasenia.css';

// Componente funcional principal, recibe contraseñas guardadas y la función para modificarlas
const GeneradorContrasenia = ({ savedPasswords, setSavedPasswords }) => {
    // Estado que controla la longitud deseada de la contraseña
    const [length, setLength] = useState(12);
    // Estados para incluir diferentes tipos de caracteres
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    // Estado para almacenar la contraseña generada actual
    const [password, setPassword] = useState('');
    // Estado para mostrar/ocultar lista de contraseñas guardadas
    const [showSaved, setShowSaved] = useState(false);
    // Estado para mostrar un mensaje de éxito al guardar una contraseña
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    // Hook para cargar contraseñas desde localStorage al iniciar el componente
    useEffect(() => {
        const stored = localStorage.getItem('savedPasswords');
        if (stored) {
        setSavedPasswords(JSON.parse(stored));
        }
    }, []);

    // Hook que guarda las contraseñas actualizadas en localStorage
    useEffect(() => {
        localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
    }, [savedPasswords]);

    // Función que genera la contraseña
    const generatePassword = () => {
        let chars = ''; // Cadena que contendrá todos los caracteres permitidos
        // Agrega caracteres según opciones seleccionadas
        if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) chars += '0123456789';
        if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        // Si no se selecciona ningún tipo, no hace nada
        if (chars === '') return;

        let result = '';
        // Genera la contraseña seleccionando caracteres al azar
        for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setPassword(result); // Guarda la contraseña generada
    };

    // Copia un texto (contraseña) al portapapeles
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('¡Contraseña copiada!');
    };

    // Guarda la contraseña actual si no está vacía ni duplicada
    const savePassword = () => {
        if (!password || savedPasswords.includes(password)) return;

        // Agrega la nueva contraseña al array de guardadas
        setSavedPasswords([...savedPasswords, password]);
        
        // Muestra un mensaje de éxito
        setShowSavedMessage(true); 

        // Oculta el mensaje después de 2 segundos
        setTimeout(() => {
            setShowSavedMessage(false);
        }, 2000);
    };

    // Elimina una contraseña guardada según su índice
    const deletePassword = (index) => {
        const updated = [...savedPasswords];
        updated.splice(index, 1); // Elimina 1 elemento en la posición indicada
        setSavedPasswords(updated);
    };

    // Renderizado del componente
    return (
        <div className="password-container">
        <h2>Generador de Contraseñas</h2>

        {/* Opciones de configuración */}
        <div className="options">
            {/* Longitud de la contraseña */}
            <label>
            Longitud (máx 20):
            <input
                type="number"
                min="4"
                max="20"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
            />
            </label>

            {/* Checkbox para incluir minúsculas */}
            <label>
            <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            Minúsculas
            </label>

            {/* Checkbox para incluir mayúsculas */}
            <label>
            <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            Mayúsculas
            </label>

            {/* Checkbox para incluir números */}
            <label>
            <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Números
            </label>

            {/* Checkbox para incluir símbolos */}
            <label>
            <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            Símbolos
            </label>
        </div>

        {/* Botón para generar la contraseña */}
        <button className="generate-btn" onClick={generatePassword}>
            Generar Contraseña
        </button>

        {/* Muestra la contraseña generada si existe */}
        {password && (
            <div className="generated-password">
            <span>{password}</span>
             {/* Acciones sobre la contraseña generada */}
            <div className="password-actions">
                <button onClick={() => copyToClipboard(password)}>Copiar</button>
                <button onClick={savePassword}>Guardar</button>
                {/* Mensaje de guardado */}
                {showSavedMessage && (
                <div className="saved-message">✅ Contraseña guardada con éxito</div>
                )}

            </div>
            </div>
        )}

        {/* Botón para ver/ocultar contraseñas guardadas */}
        {savedPasswords.length > 0 && (
            <div className="saved-toggle">
            <button onClick={() => setShowSaved(!showSaved)}>
                {showSaved ? 'Ocultar Contraseñas Guardadas' : 'Ver Contraseñas Guardadas'}
            </button>
            </div>
        )}

        {/* Historial de contraseñas guardadas */}
        {showSaved && (
            <div className="password-history">
            <h3>Contraseñas Guardadas</h3>
            <ul>
                {savedPasswords.map((p, i) => (
                <li key={i}>
                    <span>{i + 1}. {p}</span>
                    <div className="password-actions">
                    <button onClick={() => copyToClipboard(p)}>📋</button>
                    <button onClick={() => deletePassword(i)}>🗑️</button>
                    </div>
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
};

// Exporta el componente para usarlo en App.js
export default GeneradorContrasenia;

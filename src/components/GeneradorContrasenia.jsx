import React, { useState, useEffect } from 'react';
import './GeneradorContrasenia.css';

const GeneradorContrasenia = ({ savedPasswords, setSavedPasswords }) => {
    const [length, setLength] = useState(12);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [password, setPassword] = useState('');
    const [showSaved, setShowSaved] = useState(false);
    const [showSavedMessage, setShowSavedMessage] = useState(false);

    // Cargar contraseñas guardadas desde localStorage
    useEffect(() => {
        const stored = localStorage.getItem('savedPasswords');
        if (stored) {
        setSavedPasswords(JSON.parse(stored));
        }
    }, []);

    // Guardar contraseñas en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem('savedPasswords', JSON.stringify(savedPasswords));
    }, [savedPasswords]);

    const generatePassword = () => {
        let chars = '';
        if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) chars += '0123456789';
        if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (chars === '') return;

        let result = '';
        for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setPassword(result);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('¡Contraseña copiada!');
    };

    const savePassword = () => {
        if (!password || savedPasswords.includes(password)) return;

        setSavedPasswords([...savedPasswords, password]);
        setShowSavedMessage(true); // Mostrar mensaje

        setTimeout(() => {
            setShowSavedMessage(false); // Ocultar mensaje después de 2 segundos
        }, 2000);
    };


    const deletePassword = (index) => {
        const updated = [...savedPasswords];
        updated.splice(index, 1);
        setSavedPasswords(updated);
    };

    return (
        <div className="password-container">
        <h2>Generador de Contraseñas</h2>

        <div className="options">
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

            <label>
            <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            Minúsculas
            </label>

            <label>
            <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            Mayúsculas
            </label>

            <label>
            <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Números
            </label>

            <label>
            <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            Símbolos
            </label>
        </div>

        <button className="generate-btn" onClick={generatePassword}>
            Generar Contraseña
        </button>

        {password && (
            <div className="generated-password">
            <span>{password}</span>
            <div className="password-actions">
                <button onClick={() => copyToClipboard(password)}>Copiar</button>
                <button onClick={savePassword}>Guardar</button>
                {showSavedMessage && (
                <div className="saved-message">✅ Contraseña guardada con éxito</div>
                )}

            </div>
            </div>
        )}

        {savedPasswords.length > 0 && (
            <div className="saved-toggle">
            <button onClick={() => setShowSaved(!showSaved)}>
                {showSaved ? 'Ocultar Contraseñas Guardadas' : 'Ver Contraseñas Guardadas'}
            </button>
            </div>
        )}

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

export default GeneradorContrasenia;

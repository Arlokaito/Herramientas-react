import React, { useState, useEffect, useRef } from 'react';
import './Todolist.css';

const Todolist = ({ tasks, setTasks }) => {
    const [task, setTask] = useState('');
    const [availableIds, setAvailableIds] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc'); // Para controlar orden
    
    const dragItem = useRef();
    const dragOverItem = useRef();

    // Guardar tareas en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }, [tasks]);

    // Ordena automáticamente: incompletas arriba, completadas abajo
    const sortTasksByCompletion = (list) => {
        return [...list].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
        });
    };

    // Input controlado
    const handleChange = (e) => setTask(e.target.value);
    const handleKeyPress = (e) => e.key === 'Enter' && addTask();

    const addTask = () => {
        if (task.trim() === '') return;

        const newId = availableIds.length > 0
        ? Math.min(...availableIds)
        : tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

        const nuevaTarea = {
        id: newId,
        text: task,
        completed: false,
        };

        const nuevaLista = [...tasks, nuevaTarea];
        setTasks(sortTasksByCompletion(nuevaLista));
        setAvailableIds(availableIds.filter(id => id !== newId));
        setTask('');
    };

    const deleteTask = (index) => {
        const deletedId = tasks[index].id;
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(sortTasksByCompletion(updatedTasks));
        setAvailableIds([...availableIds, deletedId].sort((a, b) => a - b));
    };

    const toggleTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(sortTasksByCompletion(updatedTasks));
    };

    // Drag and drop
    const handleDragStart = (index) => dragItem.current = index;
    const handleDragEnter = (index) => dragOverItem.current = index;
    const handleDrop = () => {
        const copyListItems = [...tasks];
        const dragItemContent = copyListItems[dragItem.current];

        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);

        dragItem.current = null;
        dragOverItem.current = null;

        setTasks(sortTasksByCompletion(copyListItems));
    };

    // Ordenar manualmente por ID
    const ordenarPorId = (modo) => {
        const ordenado = [...tasks].sort((a, b) =>
        modo === 'asc' ? a.id - b.id : b.id - a.id
        );
        setSortOrder(modo);
        setTasks(sortTasksByCompletion(ordenado));
    };

    return (
        <div className="todo-container">
        <h2>To-Do List</h2>

        {/* Input */}
        <div className="todo-input">
            <input
            type="text"
            value={task}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Escribe una tarea..."
            />
            <button onClick={addTask}>Agregar</button>
        </div>

        {/* Botones de orden */}
        <div className="sort-buttons">
            <button onClick={() => ordenarPorId('asc')}>↑</button>
            <button onClick={() => ordenarPorId('desc')}>↓</button>
        </div>

        {/* Lista */}
        <ul className="todo-list">
            {tasks.map((t, index) => (
            <li
                key={t.id}
                className={t.completed ? 'completed' : ''}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(index)}
                />
                <span>{t.id}. {t.text}</span>
                <button onClick={() => deleteTask(index)}>🗑️</button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default Todolist;

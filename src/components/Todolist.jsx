// Importamos React y hooks necesarios
import React, { useState, useEffect, useRef } from 'react';

// Importamos los estilos específicos del To-Do List
import './Todolist.css';

// Componente funcional Todolist que recibe:
// - tasks: lista actual de tareas
// - setTasks: función para actualizar la lista de tareas
const Todolist = ({ tasks, setTasks }) => {
    // Estado para almacenar el texto de la tarea a ingresar
    const [task, setTask] = useState('');
    
    // Lista de IDs disponibles para reutilizar cuando se elimina una tarea
    const [availableIds, setAvailableIds] = useState([]);

    // Estado para controlar el orden (ascendente o descendente)
    const [sortOrder, setSortOrder] = useState('asc'); // Para controlar orden

    // Referencias para el ítem arrastrado y el ítem sobre el que se arrastra
    const dragItem = useRef();
    const dragOverItem = useRef();

    // Guardar tareas en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }, [tasks]);

   // Función para ordenar las tareas mostrando primero las no completadas
    const sortTasksByCompletion = (list) => {
        return [...list].sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
        });
    };

    // Actualiza el texto ingresado en el input
    const handleChange = (e) => setTask(e.target.value);

    // Agrega tarea al presionar "Enter"
    const handleKeyPress = (e) => e.key === 'Enter' && addTask();

    // Función para agregar nueva tarea
    const addTask = () => {
        if (task.trim() === '') return; // Evita agregar vacíos

        // Obtiene un ID nuevo reutilizando alguno eliminado o generando uno nuevo
        const newId = availableIds.length > 0
        ? Math.min(...availableIds)
        : tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

        // Crea el objeto de la nueva tarea
        const nuevaTarea = {
        id: newId,
        text: task,
        completed: false,
        };

        // Agrega a la lista, ordena y actualiza estado
        const nuevaLista = [...tasks, nuevaTarea];
        setTasks(sortTasksByCompletion(nuevaLista));
        // Quita el ID reutilizado
        setAvailableIds(availableIds.filter(id => id !== newId));
        // Limpia el input
        setTask('');
    };

    // Elimina una tarea por índice
    const deleteTask = (index) => {
        const deletedId = tasks[index].id;
        
        // Filtra la tarea a eliminar y actualiza la lista
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(sortTasksByCompletion(updatedTasks));
        
        // Devuelve el ID eliminado al pool de disponibles
        setAvailableIds([...availableIds, deletedId].sort((a, b) => a - b));
    };

    // Cambia el estado de completado (checkbox)
    const toggleTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(sortTasksByCompletion(updatedTasks));
    };

    // Drag & Drop - Inicio del arrastre
    const handleDragStart = (index) => dragItem.current = index;

    // Drag & Drop - Cuando entra sobre otro elemento
    const handleDragEnter = (index) => dragOverItem.current = index;

    // Drag & Drop - Suelta la tarea en nueva posición
    const handleDrop = () => {
        const copyListItems = [...tasks];
        const dragItemContent = copyListItems[dragItem.current];

        // Remueve la tarea de su posición original y la inserta en la nueva
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);

        // Limpia las referencias
        dragItem.current = null;
        dragOverItem.current = null;

        // Actualiza lista ordenada
        setTasks(sortTasksByCompletion(copyListItems));
    };

    // Ordena manualmente por ID (ascendente o descendente)
    const ordenarPorId = (modo) => {
        const ordenado = [...tasks].sort((a, b) =>
        modo === 'asc' ? a.id - b.id : b.id - a.id
        );
        setSortOrder(modo);
        setTasks(sortTasksByCompletion(ordenado));
    };

    // Render del componente
    return (
        <div className="todo-container">
        <h2>To-Do List</h2>

        {/* Input de nueva tarea y botón para agregar */}
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

        {/* Botones para ordenar por ID */}
        <div className="sort-buttons">
            <button onClick={() => ordenarPorId('asc')}>↑</button>
            <button onClick={() => ordenarPorId('desc')}>↓</button>
        </div>

        {/* Lista de tareas */}
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
                {/* Checkbox para completar tarea */}
                <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(index)}
                />
                {/* Texto de la tarea con su ID */}
                <span>{t.id}. {t.text}</span>
                
                {/* Botón para eliminar tarea */}
                <button onClick={() => deleteTask(index)}>🗑️</button>
            </li>
            ))}
        </ul>
        </div>
    );
};

// Exporta el componente para que pueda usarse en App.js
export default Todolist;

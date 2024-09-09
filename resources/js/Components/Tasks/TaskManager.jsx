import React, { useState, useEffect, useCallback } from 'react';
import CreateTask from './CreateTask';
import ViewTask from './ViewTask';
import UpdateTask from './UpdateTask';

const TaskManager = ({ descriptions, id }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        const savedOrder = localStorage.getItem(`taskOrder_${id}`);
        console.log(`Orden guardado en localStorage para ${id}:`, savedOrder);
        if (savedOrder) {
            const orderIds = JSON.parse(savedOrder);
            setTasks(prevTasks => {
                const orderedTasks = orderIds
                    .map(id => prevTasks.find(t => t.id === id))
                    .filter(Boolean);
                console.log(`Tareas ordenadas al cargar para ${id}:`, orderedTasks);
                return orderedTasks;
            });
        }
    }, [id]);

    const handleTaskCreated = useCallback((newTask) => {
        console.log('Nueva tarea creada:', newTask);
        setTasks(prevTasks => {
            const taskExists = prevTasks.some(task => task.id === newTask.id);
            if (!taskExists) {
                const updatedTasks = [...prevTasks, newTask];
                console.log('Tareas después de agregar nueva tarea:', updatedTasks);
                return updatedTasks;
            }
            return prevTasks;
        });
    }, []);

    const handleTaskClick = useCallback((taskId) => {
        console.log('Tarea seleccionada para actualizar:', taskId);
        setSelectedTaskId(taskId);
    }, []);

    const handleTaskUpdated = useCallback((updatedTask) => {
        console.log('Tarea actualizada:', updatedTask);
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            );
            console.log('Tareas después de la actualización:', updatedTasks);
            return updatedTasks;
        });
        setSelectedTaskId(null);
    }, []);

    const handleTasksReorder = useCallback((reorderedTasks) => {
        console.log('Tareas reordenadas:', reorderedTasks);
        setTasks(reorderedTasks);
        localStorage.setItem(`taskOrder_${id}`, JSON.stringify(reorderedTasks.map(t => t.id)));
        console.log(`Nuevo orden de tareas guardado en localStorage para ${id}:`, reorderedTasks.map(t => t.id));
    }, [id]);


    useEffect(() => {
        const savedOrder = localStorage.getItem(`taskOrder_${id}`);
        if (savedOrder && tasks.length > 0) {
            const orderIds = JSON.parse(savedOrder);
            const orderedTasks = orderIds
                .map(id => tasks.find(t => t.id === id))
                .filter(Boolean);
            setTasks([...orderedTasks, ...tasks.filter(t => !orderIds.includes(t.id))]);
        }
    }, [tasks, id]);

    return (
        <div>
            {/* Renderiza CreateTask para cada descripción */}
            {descriptions.map((description, index) => (
                <CreateTask
                    key={index}
                    description={description}
                    onTaskCreated={handleTaskCreated}
                />
            ))}

            {/* Renderiza la vista de tareas si hay tareas disponibles */}
            {tasks.length > 0 && (
                <ViewTask
                    tasks={tasks}
                    onTaskClick={handleTaskClick}
                    onTasksReorder={handleTasksReorder}
                />
            )}

            {/* Renderiza el componente UpdateTask si hay una tarea seleccionada */}
            {selectedTaskId && (
                <UpdateTask
                    taskId={selectedTaskId}
                    onTaskUpdated={handleTaskUpdated}
                />
            )}
        </div>
    );
};

export default TaskManager;
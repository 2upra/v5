import React, { useState, useEffect, useCallback } from 'react';
import CreateTask from './CreateTask';
import ViewTask from './ViewTask';
import UpdateTask from './UpdateTask';

//esta id que recibe es la id de la tasklist, y no la id de la tarea
const TaskManager = ({ descriptions, id }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        const savedOrder = localStorage.getItem(`taskOrder_${id}`);
        if (savedOrder) {
            const orderIds = JSON.parse(savedOrder);
            setTasks(prevTasks => {
                const orderedTasks = orderIds
                    .map(taskId => prevTasks.find(t => t.id === taskId))
                    .filter(Boolean);
                return orderedTasks;
            });
        }
    }, [id]);

    const handleTaskCreated = useCallback((newTask) => {
        setTasks(prevTasks => {
            const existingTask = prevTasks.find(task => task.id === newTask.id);
            if (!existingTask) {
                return [...prevTasks, newTask];
            }
            return prevTasks.map(task => 
                task.id === newTask.id ? { ...task, description: newTask.description } : task
            );
        });
    }, []);

    const handleTaskClick = useCallback((taskId) => {
        setSelectedTaskId(taskId);
    }, []);

    const handleTaskUpdated = useCallback((updatedTask) => {
        setTasks(prevTasks => {
            return prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            );
        });
        setSelectedTaskId(null);
    }, []);

    const handleTasksReorder = useCallback((reorderedTasks) => {
        setTasks(reorderedTasks);
        localStorage.setItem(`taskOrder_${id}`, JSON.stringify(reorderedTasks.map(t => t.id)));
    }, [id]);

    useEffect(() => {
        const savedOrder = localStorage.getItem(`taskOrder_${id}`);
        if (savedOrder && tasks.length > 0) {
            const orderIds = JSON.parse(savedOrder);
            const orderedTasks = orderIds
                .map(taskId => tasks.find(t => t.id === taskId))
                .filter(Boolean);
            setTasks([...orderedTasks, ...tasks.filter(t => !orderIds.includes(t.id))]);
        }
    }, [tasks, id]);

    return (
        <div>
            {/* Renderiza CreateTask para cada descripción, generando un ID manual */}
            {descriptions.map((description, index) => (
                <CreateTask
                    key={index}
                    id={`Task-${index}-${id}`} // Genera un ID manual único
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

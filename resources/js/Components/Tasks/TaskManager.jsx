import React, { useState, useEffect, useCallback } from 'react';
import CreateTask from './CreateTask';
import ViewTask from './ViewTask';
import UpdateTask from './UpdateTask';

const TaskManager = ({ descriptions }) => {
    const [tasks, setTasks] = useState([]);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        // Cargar el orden personalizado al iniciar
        const savedOrder = localStorage.getItem('taskOrder');
        if (savedOrder) {
            const orderIds = JSON.parse(savedOrder);
            setTasks(prevTasks => {
                const orderedTasks = [];
                orderIds.forEach(id => {
                    const task = prevTasks.find(t => t.id === id);
                    if (task) orderedTasks.push(task);
                });
                return [...orderedTasks, ...prevTasks.filter(t => !orderIds.includes(t.id))];
            });
        }
    }, []);

    const handleTaskCreated = useCallback((task) => {
        setTasks(prevTasks => {
            const newTasks = [...prevTasks, task];
            saveOrder(newTasks.map(t => t.id));
            return newTasks;
        });
    }, []);

    const handleTaskClick = useCallback((taskId) => {
        setSelectedTaskId(taskId);
    }, []);

    const handleTaskUpdated = useCallback((updatedTask) => {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === updatedTask.id ? updatedTask : task
            )
        );
        setSelectedTaskId(null);
    }, []);

    const handleTasksReorder = useCallback((reorderedTasks) => {
        setTasks(reorderedTasks);
        saveOrder(reorderedTasks.map(t => t.id));
    }, []);

    const saveOrder = useCallback((orderIds) => {
        localStorage.setItem('taskOrder', JSON.stringify(orderIds));
    }, []);

    return (
        <div>
            {descriptions.map((description, index) => (
                <CreateTask
                    key={index}
                    description={description}
                    onTaskCreated={handleTaskCreated}
                />
            ))}

            {tasks.length > 0 && (
                <ViewTask 
                    tasks={tasks} 
                    onTaskClick={handleTaskClick}
                    onTasksReorder={handleTasksReorder}
                />
            )}
                
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
import React, { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

const Task = ({ title, description }) => {
    const { tasks } = usePage().props;

    // Verifica si la tarea ya existe
    const existingTask = tasks.find(task => task.title === title);

    useEffect(() => {
        if (!existingTask) {
            // Si la tarea no existe, la crea
            Inertia.post('/tasks', { title, description });
        }
    }, [title, description, existingTask]);

    if (existingTask) {
        return (
            <div>
                <h2>{existingTask.title}</h2>
                <p>{existingTask.description}</p>
                <p>Status: {existingTask.status}</p>
                {existingTask.user && (
                    <p>
                        Assigned to: {existingTask.user.name} <img src={existingTask.user.profile_photo_url} alt={existingTask.user.name} />
                    </p>
                )}
            </div>
        );
    }

    return null; // Mientras se crea la tarea, no se muestra nada
};

export default Task;
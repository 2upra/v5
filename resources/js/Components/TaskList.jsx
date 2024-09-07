import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

const TaskList = () => {
    const { tasks, auth } = usePage().props;
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/tasks', newTask, {
            onSuccess: () => setNewTask({ title: '', description: '' }), // Reset form on success
        });
    };

    const handleStatusChange = (task, status) => {
        Inertia.put(`/tasks/${task.id}`, { status });
    };

    return (
        <div>
            <h1>Task List</h1>

            {/* Formulario para agregar una nueva tarea */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={newTask.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={newTask.description}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Add Task</button>
            </form>

            {/* Lista de tareas */}
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        {task.user && (
                            <p>
                                Assigned to: {task.user.name} <img src={task.user.profile_photo_url} alt={task.user.name} />
                            </p>
                        )}
                        {auth.user && (
                            <div>
                                {task.status === 'inactive' && (
                                    <button onClick={() => handleStatusChange(task, 'in_progress')}>Start Progress</button>
                                )}
                                {task.status === 'in_progress' && task.user_id === auth.user.id && (
                                    <button onClick={() => handleStatusChange(task, 'completed')}>Complete</button>
                                )}
                                {task.status !== 'inactive' && task.user_id === auth.user.id && (
                                    <button onClick={() => handleStatusChange(task, 'inactive')}>Reset</button>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
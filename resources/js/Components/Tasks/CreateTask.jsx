import React, { useEffect } from 'react';
import axios from 'axios';

const CreateTask = ({ description, onTaskCreated }) => {

    /**
     * checkIfTaskExists - Verifica si ya existe una tarea con la descripción proporcionada.
     * 
     * @param {string} description - La descripción de la tarea a verificar.
     * @returns {Object|null} - Retorna la tarea existente si se encuentra, de lo contrario, retorna null.
     */
    const checkIfTaskExists = async (description) => {
        try {
            const response = await axios.get(`/tasks?description=${description}`);
            console.log('Check if task exists response:', response.data);
            return response.data.length > 0 ? response.data[0] : null;
        } catch (error) {
            console.error('Error checking if task exists:', error);
            return null;
        }
    };

    /**
     * createTask - Crea una nueva tarea si no existe una con la misma descripción.
     * 
     * Si la tarea ya existe, se omite la creación y se devuelve la tarea existente.
     * Si no existe, se crea una nueva tarea con el estado predeterminado.
     */
    const createTask = async () => {
        try {
            const existingTask = await checkIfTaskExists(description);

            if (existingTask) {
                console.log('Task already exists, skipping creation.');
                if (onTaskCreated) {
                    onTaskCreated(existingTask); // Devuelve la tarea existente
                }
                return;
            }

            const response = await axios.post('/tasks', {
                description,
                status: 'default',
                executed_by: null 
            });
            console.log('Task created:', response.data);
            if (onTaskCreated) {
                onTaskCreated(response.data); // Devuelve la nueva tarea creada
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    /**
     * useEffect - Ejecuta la creación de la tarea cuando la descripción cambia.
     * 
     * Este efecto se activa cada vez que la prop `description` cambia, asegurando que
     * se intente crear una nueva tarea con la descripción actual.
     */
    useEffect(() => {
        createTask();
    }, [description]); // Se asegura de que se ejecute cuando la descripción cambie

    return null; // No renderiza nada, solo se encarga de crear la tarea
};

export default CreateTask;
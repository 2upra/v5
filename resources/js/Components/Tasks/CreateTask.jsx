import React, { useEffect } from 'react';
import axios from 'axios';


const CreateTask = ({ description, onTaskCreated }) => {

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

    const createTask = async () => {
        try {
            const existingTask = await checkIfTaskExists(description);

            if (existingTask) {
                console.log('Task already exists, skipping creation.');
                if (onTaskCreated) {
                    onTaskCreated(existingTask); 
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

    useEffect(() => {
        createTask();
    }, [description]);

    return null; 
};

export default CreateTask;



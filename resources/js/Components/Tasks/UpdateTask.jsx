import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateTask = ({ taskId, onTaskUpdated }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndUpdateTask = async () => {
            setError(null);
            try {
                // Obtener la tarea por ID
                const response = await axios.get(`/tasks/${taskId}`);
                const task = response.data;

                // Determinar el nuevo estado de la tarea
                let newStatus;
                let executedBy = task.executed_by; // Mantener el usuario asignado por defecto

                switch (task.status) {
                    case 'default':
                        newStatus = 'in_progress';
                        break;
                    case 'in_progress':
                        newStatus = 'completed';
                        break;
                    case 'completed':
                        newStatus = 'default';
                        executedBy = null; // Quitar la ID del usuario cuando el estado sea "default"
                        break;
                    default:
                        console.error('Estado desconocido:', task.status);
                        return;
                }

                // Actualizar la tarea con el nuevo estado
                const updateResponse = await axios.put(`/tasks/${taskId}`, {
                    description: task.description,
                    status: newStatus,
                    executed_by: executedBy, // Enviar el usuario asignado o null
                });

                console.log('Tarea actualizada:', updateResponse.data);

                // Notificar al componente padre que la tarea ha sido actualizada
                if (onTaskUpdated) {
                    onTaskUpdated(updateResponse.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    setError('No tienes permiso para realizar esta acción.');
                } else {
                    console.error('Error al obtener o actualizar la tarea:', error);
                    setError('Error al obtener o actualizar la tarea');
                }
            }
        };

        if (taskId) {
            fetchAndUpdateTask();
        }
    }, [taskId, onTaskUpdated]); // Se asegura de que se ejecute cuando `taskId` cambie

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default UpdateTask;
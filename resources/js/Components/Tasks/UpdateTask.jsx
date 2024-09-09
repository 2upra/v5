import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateTask = ({ taskId, onTaskUpdated }) => {

    const [error, setError] = useState(null);

    const fetchAndUpdateTask = async () => {
        setError(null); // Reinicia el estado de error antes de realizar la operación

        try {
            // Obtiene la tarea por ID desde el servidor
            const response = await axios.get(`/tasks/${taskId}`);
            const task = response.data;

            // Determina el nuevo estado de la tarea basado en su estado actual
            let newStatus;
            let executedBy = task.executed_by; // Mantiene el usuario asignado por defecto

            // Cambia el estado de la tarea según su estado actual
            switch (task.status) {
                case 'default':
                    newStatus = 'in_progress';
                    break;
                case 'in_progress':
                    newStatus = 'completed';
                    break;
                case 'completed':
                    newStatus = 'default';
                    executedBy = null; // Elimina la ID del usuario cuando el estado es "default"
                    break;
                default:
                    console.error('Estado desconocido:', task.status);
                    return;
            }

            // Actualiza la tarea en el servidor con el nuevo estado y usuario asignado
            const updateResponse = await axios.put(`/tasks/${taskId}`, {
                description: task.description,
                status: newStatus,
                executed_by: executedBy, // Envía el usuario asignado o null
            });

            console.log('Tarea actualizada:', updateResponse.data);

            // Notifica al componente padre que la tarea ha sido actualizada
            if (onTaskUpdated) {
                onTaskUpdated(updateResponse.data);
            }
        } catch (error) {
            // Manejo de errores, incluyendo errores de permisos (403)
            if (error.response && error.response.status === 403) {
                setError('No tienes permiso para realizar esta acción.');
            } else {
                console.error('Error al obtener o actualizar la tarea:', error);
                setError('Error al obtener o actualizar la tarea');
            }
        }
    };

    useEffect(() => {
        if (taskId) {
            fetchAndUpdateTask();
        }
    }, [taskId, onTaskUpdated]);

    return (
        <div>
            {/* Muestra un mensaje de error si existe */}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default UpdateTask;
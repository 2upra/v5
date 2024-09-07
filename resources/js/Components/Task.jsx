import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

const Task = ({
    id,
    title,
    description,
    status,
    assignedUser,
    lastUpdatedBy,
    currentUser,
    onTaskCreated,
    tasks,
}) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const { post, put, data, setData } = useForm({
        id: id || "",
        title: title || "",
        description: description || "",
        status: status || "inactive",
    });

    useEffect(() => {
        if (!id && data.title && data.description && !taskExists()) {
            createTask();
        }
        console.log("data.status changed to:", data.status);
    }, []);

    const taskExists = () => {
        return tasks.some(
            (task) =>
                task.title.toLowerCase() === data.title.toLowerCase() &&
                task.description.toLowerCase() ===
                    data.description.toLowerCase()
        );
    };

    const createTask = () => {
        if (taskExists()) {
            return;
        }

        setIsUpdating(true);

        axios
            .post("/tasks", {
                title: data.title,
                description: data.description,
                status: data.status,
                user_id: currentUser.id,
            })
            .then((response) => {
                setIsUpdating(false);
                setData("id", response.data.task.id);
                if (onTaskCreated) {
                    onTaskCreated(response.data.task);
                }
            })
            .catch((error) => {
                setIsUpdating(false);
                if (error.response && error.response.status === 422) {
                    if (error.response.data.task) {
                        setData("id", error.response.data.task.id);
                        if (onTaskCreated) {
                            onTaskCreated(error.response.data.task);
                        }
                    }
                }
            });
    };

    const toggleStatus = () => {
        console.log("toggleStatus called. Current status:", data.status);

        if (isTaskLocked) {
            console.log("Task is locked. Cannot change status.");
            return;
        }

        const nextStatus = {
            inactive: "in_progress",
            in_progress: "completed",
            completed: "inactive",
        }[data.status];

        console.log("Next status should be:", nextStatus);

        // Actualizar el estado local inmediatamente
        setData("status", nextStatus);
        console.log("Local state updated to:", nextStatus);

        // Enviar la actualización al servidor
        updateTask(nextStatus);
    };

    const updateTask = (newStatus) => {
        console.log("updateTask called with newStatus:", newStatus);
        setIsUpdating(true);
        put(
            `/tasks/${data.id}`,
            { status: newStatus },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsUpdating(false);
                    console.log("Status successfully updated to:", newStatus);
                },
                onError: (errors) => {
                    setIsUpdating(false);
                    console.log("Error updating task:", errors);
                    setData("status", data.status);
                    console.log("Reverted status to:", data.status);
                },
            }
        );
    };
    
    const isTaskLocked =
        data.status !== "inactive" && lastUpdatedBy?.id !== currentUser.id;

    return (
        <div
            onClick={toggleStatus}
            style={{
                cursor: isTaskLocked ? "not-allowed" : "pointer",
                opacity: isTaskLocked ? 0.5 : 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                marginBottom: "10px",
            }}
        >
            <h2>{data.title}</h2>
            <p>{data.description}</p>
            <p>Status: {data.status}</p>

            {assignedUser && (
                <p>
                    Assigned to: {assignedUser.name}
                    {assignedUser.profile_photo_url && (
                        <img
                            src={assignedUser.profile_photo_url}
                            alt={assignedUser.name}
                            style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                            }}
                        />
                    )}
                </p>
            )}

            {lastUpdatedBy && (
                <p>
                    Last updated by: {lastUpdatedBy.name}
                    {lastUpdatedBy.profile_photo_url && (
                        <img
                            src={lastUpdatedBy.profile_photo_url}
                            alt={lastUpdatedBy.name}
                            style={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                            }}
                        />
                    )}
                </p>
            )}

            {isUpdating && <p>Updating...</p>}
            {isTaskLocked && <p>This task is locked</p>}
        </div>
    );
};

export default Task;

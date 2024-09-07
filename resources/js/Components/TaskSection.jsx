// TaskSection.jsx
import React, { useState } from 'react';
import Task from '@/Components/Task';

const TaskSection = ({ title, description, currentUser, tasks, onTaskCreated }) => {
    const [newTask, setNewTask] = useState(null);

    const handleTaskCreated = (createdTask) => {
        setNewTask(createdTask);
        if (onTaskCreated) {
            onTaskCreated(createdTask);
        }
    };

    return (
        <div>
            <div className="hidden">
                {currentUser && (
                    <Task
                        title={title}
                        description={description}
                        currentUser={currentUser}
                        tasks={tasks}
                        onTaskCreated={handleTaskCreated}
                        key={`new-task-${title}`}
                    />
                )}
            </div>
            {newTask && (
                <Task
                    key={newTask.id}
                    id={newTask.id}
                    title={newTask.title}
                    description={newTask.description}
                    status={newTask.status}
                    assignedUser={newTask.user}
                    lastUpdatedBy={newTask.last_updated_by}
                    currentUser={currentUser}
                    tasks={tasks}
                    onTaskCreated={handleTaskCreated}
                />
            )}
        </div>
    );
};

export default TaskSection;
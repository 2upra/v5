import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Badge } from "@/Components/badge";
import { Checkbox } from "@/Components/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/table";

const ViewTask = ({ tasks, onTaskClick, onTasksReorder }) => {
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedTasks = Array.from(tasks);
        const [reorderedItem] = reorderedTasks.splice(result.source.index, 1);
        reorderedTasks.splice(result.destination.index, 0, reorderedItem);

        onTasksReorder(reorderedTasks);
    };

    return (
        <div className="space-y-4">
            {tasks.length > 0 && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12"></TableHead>
                                    <TableHead className="w-20 whitespace-nowrap">ID</TableHead>
                                    <TableHead className="w-1/2 text-xs">Descripción</TableHead>
                                    <TableHead className="w-32 whitespace-nowrap">Estado</TableHead>
                                    <TableHead className="w-32 whitespace-nowrap">Asignado a</TableHead>
                                </TableRow>
                            </TableHeader>
                            <Droppable droppableId="tasks">
                                {(provided) => (
                                    <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                                        {tasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                {(provided) => (
                                                    <TableRow
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                                        onClick={() => onTaskClick(task.id)}
                                                    >
                                                        <TableCell>
                                                            <Checkbox
                                                                checked={task.status === "completed"}
                                                                readOnly
                                                                aria-label="Task completed"
                                                                className="translate-y-[2px]"
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className="truncate font-medium whitespace-nowrap">
                                                                {task.id}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className="truncate font-medium">
                                                                {task.description}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline" className="whitespace-nowrap">
                                                                {task.status === "in_progress" ? "En progreso" :
                                                                 task.status === "completed" ? "Completada" : "Pendiente"}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className="truncate whitespace-nowrap">
                                                                {task.executed_by || "Sin asignar"}
                                                            </span>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </TableBody>
                                )}
                            </Droppable>
                        </Table>
                    </div>
                </DragDropContext>
            )}
        </div>
    );
};

ViewTask.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onTaskClick: PropTypes.func.isRequired,
    onTasksReorder: PropTypes.func.isRequired,
};

export default ViewTask;
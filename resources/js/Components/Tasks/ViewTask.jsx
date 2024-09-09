import React from "react";
import * as PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Checkbox } from "@/Components/Checkboxs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/Tables";
import TaskDetailsDialog from "./TaskDetailsDialogs"; 
import { Badge } from "@/Components/badge";

const ViewTask = ({ tasks, onTaskClick, onTasksReorder }) => {

    const getBadgeClass = (status) => {
        switch (status) {
            case "default":
                return "badge-pending";
            case "in_progress":
                return "badge-in-progress";
            case "completed":
                return "badge-completed";
            default:
                return "";
        }
    };

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
                                    <TableHead className="w-20 whitespace-nowrap hidden">ID</TableHead> {/* Ocultar encabezado de ID */}
                                    <TableHead className="w-7/12 text-xs">Descripción</TableHead>
                                    <TableHead className="w-32 whitespace-nowrap">Estado</TableHead>
                                    <TableHead className="w-32 whitespace-nowrap">Asignado a</TableHead>
                                    <TableHead className="w-20 whitespace-nowrap">Detalles</TableHead> {/* Nueva columna para el botón de detalles */}
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
                                                    >
                                                        <TableCell>
                                                            <Checkbox
                                                                checked={task.status === "completed"}
                                                                onClick={() => onTaskClick(task.id)} // Mover el onClick aquí
                                                                readOnly
                                                                aria-label="Task completed"
                                                                className="translate-y-[2px]"
                                                            />
                                                        </TableCell>
                                                        <TableCell className="hidden"> {/* Ocultar celda de ID */}
                                                            <span className="truncate font-medium whitespace-nowrap">
                                                                {task.id}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className="font-medium">
                                                                {task.description}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge variant="outline" className={`whitespace-nowrap ${getBadgeClass(task.status)}`}>
                                                                {task.status === "in_progress" ? "En progreso" :
                                                                    task.status === "completed" ? "Completada" : "Pendiente"}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className="truncate whitespace-nowrap">
                                                                {task.user ? task.user.name : "Sin asignar"}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell>
                                                           <TaskDetailsDialog task={task} />
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
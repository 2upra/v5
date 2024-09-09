import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/Components/dialog";
import { Badge } from "@/Components/badge";

const TaskDetailsDialog = ({ task }) => {
    if (!task) return null;

    return (
        <Dialog>
            <DialogTrigger dialogId={`dialog-${task.id}`}>
                <Badge variant="outline" className="cursor-pointer">
                    Detalles
                </Badge>
            </DialogTrigger>
            <DialogContent dialogId={`dialog-${task.id}`}>
                <DialogHeader>
                    <DialogTitle>Detalles de la Tarea</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <p><strong>ID:</strong> {task.id}</p>
                    <p><strong>Descripción:</strong> {task.description}</p>
                    <p><strong>Estado:</strong> {task.status}</p>
                    <p><strong>Asignado a:</strong> {task.user ? task.user.name : "Sin asignar"}</p>
                </DialogDescription>
                <DialogFooter>
                    <button onClick={() => document.getElementById(`dialog-${task.id}`).close()}>Cerrar</button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default TaskDetailsDialog;
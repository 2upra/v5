import React from "react";
import { DialogTrigger } from "@/Components/DialogComponet";
import { Badge } from "@/Components/badge";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/Components/Tooltip";
import { useDialogContext } from "../DialogContext";

const TaskDetailsDialog = ({ task }) => {
    if (!task) return null;

    const dialogId = `task-${task.id}`;
    const { isDialogRegistered } = useDialogContext();

    const hasDialogContent = isDialogRegistered(dialogId);

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger>
                    <DialogTrigger dialogId={dialogId}>
                        <Badge 
                            variant="outline" 
                            style={{ opacity: hasDialogContent ? 1 : 0.3 }}
                        >
                            Detalles
                        </Badge>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{dialogId}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default TaskDetailsDialog;
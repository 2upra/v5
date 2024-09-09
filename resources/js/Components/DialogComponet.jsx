import React, { forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDialogContext } from './DialogContext';
import { cn } from "@/lib/utils";


export const DialogTrigger = forwardRef(({ dialogId, children, className, ...props }, ref) => {
  const { openDialog } = useDialogContext();
  return (
    <button
      ref={ref}
      onClick={() => openDialog(dialogId)}
      {...props}
    >
      {children}
    </button>
  );
});

export const DialogContent = ({ dialogId, children, className, ...props }) => {
  const { openDialogId, closeDialog, registerDialog, unregisterDialog } = useDialogContext();

  useEffect(() => {
    registerDialog(dialogId);
    return () => unregisterDialog(dialogId);
  }, [dialogId]);

  if (openDialogId !== dialogId) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" onClick={closeDialog}>
      <div
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        onClick={e => e.stopPropagation()}
        {...props}
      >
        {children}
        <button
          onClick={closeDialog}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>,
    document.body
  );
};

export const DialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);

export const DialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);

export const DialogTitle = ({
  className,
  ...props
}) => (
  <h2
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);

export const DialogDescription = ({
  className,
  ...props
}) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);
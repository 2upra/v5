// DialogContext.jsx
import React, { createContext, useContext, useState } from 'react';

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [openDialogId, setOpenDialogId] = useState(null);
  const [registeredDialogs, setRegisteredDialogs] = useState({});

  const openDialog = (id) => setOpenDialogId(id);
  const closeDialog = () => setOpenDialogId(null);
  const registerDialog = (id) => setRegisteredDialogs(prev => ({ ...prev, [id]: true }));
  const unregisterDialog = (id) => setRegisteredDialogs(prev => {
    const newState = { ...prev };
    delete newState[id];
    return newState;
  });
  const isDialogRegistered = (id) => !!registeredDialogs[id];

  return (
    <DialogContext.Provider value={{
      openDialogId,
      openDialog,
      closeDialog,
      registerDialog,
      unregisterDialog,
      isDialogRegistered,
    }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => useContext(DialogContext);
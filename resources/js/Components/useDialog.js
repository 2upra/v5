// useDialog.js
import { useState } from 'react';

export const useDialog = () => {
  const [openDialogId, setOpenDialogId] = useState(null);

  const openDialog = (id) => setOpenDialogId(id);
  const closeDialog = () => setOpenDialogId(null);

  return { openDialogId, openDialog, closeDialog };
};
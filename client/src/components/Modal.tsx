import React from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@mui/material';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="md">
      <DialogContent dividers={true}>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Zpět
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;

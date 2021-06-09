import React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';

import {
  Button,
  IconButton,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Fab,
} from '@material-ui/core';

import { ButtonTypes } from '../types';
import { useDialogStyles } from '../../styles/dialogStyles';

const ConfirmDialog: React.FC<{
  title: string;
  bodyContent: string;
  buttonText: string;
  buttonType: ButtonTypes;
  actionFunction: () => void;
}> = ({ title, bodyContent, buttonText, buttonType, actionFunction }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useDialogStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = () => {
    actionFunction();
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title">{title}</DialogTitle>
        <DialogContent dividers>
          <Typography>{bodyContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAction} color="primary">
            {buttonType.text}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;

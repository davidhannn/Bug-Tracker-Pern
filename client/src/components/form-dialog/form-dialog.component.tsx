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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const FormDialog: React.FC<{
  title: string;
  buttonType: ButtonTypes;
  children: React.ReactNode;
}> = ({ title, buttonType, children }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const displayedButton = () => {
    if (buttonType.type === 'icon') {
      return (
        <IconButton color={buttonType.color} onClick={handleClickOpen}>
          <buttonType.icon fontSize={buttonType.iconSize} />
        </IconButton>
      );
    } else if (buttonType.type === 'menu') {
      return (
        <MenuItem onClick={handleClickOpen}>
          <buttonType.icon style={buttonType.iconStyle} />
          {buttonType.text}
        </MenuItem>
      );
    } else if (buttonType.type === 'normal') {
      return (
        <Button
          onClick={handleClickOpen}
          color={buttonType.color || 'primary'}
          variant={buttonType.variant || 'contained'}
          size={buttonType.size || 'medium'}
          startIcon={<buttonType.icon />}
          style={buttonType.style}
          className={buttonType.className}
        >
          {buttonType.text}
        </Button>
      );
    }
  };

  return (
    <div>
      {displayedButton()}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;

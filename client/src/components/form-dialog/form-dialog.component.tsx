import React from 'react';
import {
  createStyles,
  Theme,
  useTheme,
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
  Paper,
  useMediaQuery,
} from '@material-ui/core';

import { useDialogStyles } from '../../styles/dialogStyles';
import { ButtonTypes } from '../types';

const FormDialog: React.FC<{
  title: string;
  buttonType: ButtonTypes;
  children: React.ReactNode;
}> = ({ title, buttonType, children }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useDialogStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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
    <div style={{ display: 'inline' }}>
      {displayedButton()}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle id="customized-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;

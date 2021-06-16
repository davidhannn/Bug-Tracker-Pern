import { Fragment, useState } from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';

import { useDispatch } from 'react-redux';

import { createBug } from '../../redux/slices/bugSlice';
import { BugPayload, BugPriority } from '../../redux/types';

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

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function BugsCreate({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState<BugPriority>('Low');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPriority(event.target.value as BugPriority);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(createBug(projectId, { name, description, priority }));
  };

  return (
    <Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <AddIcon />
        Add Bug
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add a Bug
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <TextField
              id="outlined-basic"
              label="Bug Title"
              variant="outlined"
              name="title"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
            <TextField
              id="outlined-basic"
              multiline={true}
              rows={5}
              label="Description"
              variant="outlined"
              name="description"
              style={{ height: 10 }}
              value={description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Priority</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={priority}
                onChange={handleChange}
              >
                <FormControlLabel value="Low" control={<Radio />} label="Low" />
                <FormControlLabel
                  value="Medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel
                  value="High"
                  control={<Radio />}
                  label="High"
                />
                <FormControlLabel
                  value="disabled"
                  disabled
                  control={<Radio />}
                  label="(Disabled option)"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              color="primary"
              type="submit"
            >
              Save changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
}

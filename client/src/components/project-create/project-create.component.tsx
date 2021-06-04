import { SyntheticEvent, useEffect, useState, Fragment } from 'react';
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

import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';

import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { getUsers, selectUsersState } from '../../redux/slices/usersSlice';

import Chip from '@material-ui/core/Chip';

import MemberDropdown from '../../components/member-dropdown/member-dropdown.component';

import { User } from '../../redux/types';
import { createNewProject } from '../../redux/slices/projectSlice';

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

const ProjectCreate = () => {
  const [open, setOpen] = useState(false);

  const { users } = useSelector(selectUsersState);
  // const classes = useStyles();

  const [members, setMembers] = useState<string[]>([]);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const selectMembersOnChange = (e: any, selectedOption: User[]) => {
    setMembers(selectedOption.map((option) => option.id));
  };

  const handleCreateProject = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(createNewProject({ name, members }));
  };

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <AddIcon />
        Create Project
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create Project
        </DialogTitle>
        <form onSubmit={handleCreateProject}>
          <TextField
            id="outlined-basic"
            label="Project Name"
            variant="outlined"
            type="text"
            name="name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          {/* <MemberDropdown /> */}
          {users && (
            <Autocomplete
              multiple
              id="tags-outlined"
              onChange={selectMembersOnChange}
              options={users}
              getOptionLabel={(user) => user && user.username}
              defaultValue={[]}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Members"
                  placeholder="Favorites"
                />
              )}
            />
          )}
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
};

export default ProjectCreate;

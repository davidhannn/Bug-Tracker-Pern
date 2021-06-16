import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { createBug } from '../../redux/slices/bugSlice';
import { BugPayload, BugPriority } from '../../redux/types';

import { useFormStyles } from '../../styles/muiStyles';

import {
  TextField,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  InputAdornment,
  DialogContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

interface AddBug {
  editMode: 'add';
  currentName?: string;
  projectId?: string;
  currentId?: string;
  bugDescription?: string;
  resolvedStatus?: boolean;
  priorityStatus?: BugPriority;
}
interface UpdateBug {
  editMode: 'update';
  currentName: string;
  projectId: string;
  currentId: string;
  bugDescription: string;
  resolvedStatus?: boolean;
  priorityStatus?: BugPriority;
}

type BugFormTypes = UpdateBug | AddBug;

const BugForm: React.FC<BugFormTypes> = ({
  editMode,
  currentName,
  currentId,
  projectId,
  bugDescription,
  resolvedStatus,
  priorityStatus,
}) => {
  const classes = useFormStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<BugPriority>('Low');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPriority(event.target.value as BugPriority);
  };

  const handleAddBug = () => {
    console.log('testing');
    dispatch(createBug(projectId as string, { name, description, priority }));
  };

  const handleEditBug = () => {
    console.log('testing');
  };

  return (
    <form onSubmit={editMode === 'add' ? handleAddBug : handleEditBug}>
      {editMode === 'add' ? (
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
              <FormControlLabel value="High" control={<Radio />} label="High" />
              <FormControlLabel
                value="disabled"
                disabled
                control={<Radio />}
                label="(Disabled option)"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
      ) : null}
      <Button
        size="large"
        color="primary"
        variant="contained"
        type="submit"
        className={classes.submitButton}
      >
        {editMode === 'add' ? 'Add a Bug' : 'Edit Bug '}
      </Button>
    </form>
  );
};

export default BugForm;

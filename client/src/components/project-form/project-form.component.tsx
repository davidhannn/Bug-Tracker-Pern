import { useState, useEffect, Fragment } from 'react';

import {
  TextField,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  InputAdornment,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';

import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { getUsers, selectUsersState } from '../../redux/slices/usersSlice';
import { selectAuthState } from '../../redux/slices/authSlice';
import { editProjectName } from '../../redux/slices/projectSlice';

import { User } from '../../redux/types';
import { createNewProject } from '../../redux/slices/projectSlice';
import { useFormStyles } from '../../styles/muiStyles';

interface CreateProject {
  editMode: 'project';
  currentName?: string;
  currentMembers?: string[];
  projectId?: string;
  closeDialog?: () => void;
}

// interface AddMembers {

// }

interface EditProjectName {
  editMode: 'name';
  currentName: string;
  projectId: string;
  currentMembers?: string[];
  closeDialog?: () => void;
}

type ProjectFormType = CreateProject | EditProjectName;

const ProjectForm: React.FC<ProjectFormType> = ({
  editMode,
  currentName,
  currentMembers,
  projectId,
  closeDialog,
}) => {
  const classes = useFormStyles();
  const dispatch = useDispatch();
  const { users } = useSelector(selectUsersState);
  const { user } = useSelector(selectAuthState);

  const [members, setMembers] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const selectMembersOnChange = (e: any, selectedOption: User[]) => {
    setMembers(selectedOption.map((option) => option.id));
  };

  const handleCreateProject = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(createNewProject({ name, members }, closeDialog));
  };

  const handleEditProjectName = () => {
    dispatch(editProjectName(projectId as string, projectName));
  };

  return (
    <form
      onSubmit={
        editMode === 'project' ? handleCreateProject : handleEditProjectName
      }
    >
      {editMode === 'project' ? (
        <Fragment>
          <TextField
            id="outlined-basic"
            label="Project Name"
            variant="outlined"
            fullWidth
            type="text"
            name="name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Autocomplete
            multiple
            id="tags-outlined"
            onChange={selectMembersOnChange}
            options={users.filter((projectUser) =>
              user != null ? projectUser.id !== user.id : null
            )}
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
        </Fragment>
      ) : null}
      {editMode === 'name' ? (
        <Fragment>
          <TextField
            id="outlined-basic"
            label="Edit Project Name"
            variant="outlined"
            type="text"
            defaultValue={currentName}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Fragment>
      ) : null}

      <Button size="large" color="primary" variant="contained" type="submit">
        {editMode === 'name'
          ? 'Edit Project Name'
          : editMode === 'project'
          ? 'Add Project'
          : null}
      </Button>
    </form>
  );
};

export default ProjectForm;

import { SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUsers, selectUsersState } from '../../redux/slices/usersSlice';

import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

import MemberDropdown from '../../components/member-dropdown/member-dropdown.component';

import { User } from '../../redux/types';
import { createNewProject } from '../../redux/slices/projectSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  })
);

const CreateProjectPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(selectUsersState);
  const classes = useStyles();

  const [members, setMembers] = useState<string[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const selectMembersOnChange = (e: any, selectedOption: User[]) => {
    setMembers(selectedOption.map((option) => option.id));
  };

  const handleCreateProject = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(createNewProject({ name, members }));
  };

  return (
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
      <button>Create Project</button>
    </form>
  );
};

export default CreateProjectPage;

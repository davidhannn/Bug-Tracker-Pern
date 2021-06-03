import React, { useState, Fragment } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface InputValues {
  username: string;
  password: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
);

const RegisterPage = () => {
  const classes = useStyles();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.SyntheticEvent) => {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <Fragment>
      <h1>Register Page</h1>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={username}
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={password}
          onChange={handleChange}
        />
      </form>
    </Fragment>
  );
};

export default RegisterPage;

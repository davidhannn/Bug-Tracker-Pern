import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);

export default function ProjectButton() {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push('/createProject');
  };

  return (
    <div className={classes.root}>
      <Button variant="outlined" color="primary" onClick={handleClick}>
        <AddBoxIcon />
        Create New Project
      </Button>
    </div>
  );
}

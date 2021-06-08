import React from 'react';
import { useSelector } from 'react-redux';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useHeaderStyles } from '../../styles/muiStyles';

import { selectAuthState } from '../../redux/slices/authSlice';
import { ProjectState } from '../../redux/types';

const ProjectHeader: React.FC<{ currentProject: ProjectState }> = ({
  currentProject,
}) => {
  const classes = useHeaderStyles();
  const { user } = useSelector(selectAuthState);
  const { createdAt, createdBy, id, members, name, updatedAt } = currentProject;

  const isAdmin = user?.id === createdBy.id;

  // const adminButtons = () => {
  //   if (!isAdmin) return null;

  //   return (

  //   )
  // };

  return (
    <div className={classes.root}>
      <Paper className={classes.headerPaper}>
        <div>
          <Typography>{name}</Typography>
          {isAdmin ? <EditIcon /> : null}
          <Typography>Admin: {createdBy.username} </Typography>
          <Typography>Created On: {createdAt}</Typography>
        </div>
      </Paper>
    </div>
  );
};

export default ProjectHeader;

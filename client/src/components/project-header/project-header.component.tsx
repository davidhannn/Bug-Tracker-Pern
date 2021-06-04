import React from 'react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';

import { useHeaderStyles } from '../../styles/muiStyles';

import { ProjectState } from '../../redux/types';

const ProjectHeader: React.FC<{ currentProject: ProjectState }> = ({
  currentProject,
}) => {
  const classes = useHeaderStyles();
  const { createdAt, createdBy, id, members, name, updatedAt } = currentProject;

  return (
    <div className={classes.root}>
      <Paper className={classes.headerPaper}>
        <div>
          <Typography>{name}</Typography>
          <Typography>Admin: {createdBy.username} </Typography>
          <Typography>Created On: {createdAt}</Typography>
        </div>
      </Paper>
    </div>
  );
};

export default ProjectHeader;

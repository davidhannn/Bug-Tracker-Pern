import React from 'react';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Paper, Typography } from '@material-ui/core';
import { selectBugById } from '../../redux/slices/bugSlice';
import { formatDateTime } from '../../utils/helper';

import { useBugPageStyles } from '../../styles/muiStyles';
interface ParamTypes {
  projectId: string;
  bugId: string;
}

const BugPage = () => {
  const { bugId, projectId } = useParams<ParamTypes>();
  const bugData = useSelector((state: RootState) =>
    selectBugById(state, bugId, projectId)
  );
  const classes = useBugPageStyles();

  console.log(bugData);
  return (
    <div className={classes.root}>
      <Paper className={classes.body}>
        <div>
          <h3>Description</h3>
          <Typography>{bugData && bugData.description}</Typography>
        </div>
        <div>
          <h3>Bug Details</h3>
          <Typography>Created By: {bugData?.createdBy.username}</Typography>
          <Typography>
            Created On {bugData && formatDateTime(bugData.createdAt)}
          </Typography>
          <Typography>Priority: {bugData && bugData.priority}</Typography>
          <Typography>
            Status: {bugData && bugData.isResolved ? 'Open' : 'Closed'}
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default BugPage;

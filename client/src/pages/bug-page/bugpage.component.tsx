import React from 'react';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { Paper, Typography } from '@material-ui/core';
import { selectAuthState } from '../../redux/slices/authSlice';
import { selectBugById, deleteBug } from '../../redux/slices/bugSlice';
import { formatDateTime } from '../../utils/helper';

import { useBugPageStyles } from '../../styles/muiStyles';

import ConfirmDialog from '../../components/confirm-dialog/confirm-dialog.component';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
interface ParamTypes {
  projectId: string;
  bugId: string;
}

const BugPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { bugId, projectId } = useParams<ParamTypes>();
  const { user } = useSelector(selectAuthState);
  const bug = useSelector((state: RootState) =>
    selectBugById(state, bugId, projectId)
  );
  const classes = useBugPageStyles();

  if (!bug) {
    return (
      <div>
        <p>No bugs</p>
      </div>
    );
  }

  console.log(bug);
  const {
    id,
    name,
    description,
    priority,
    isResolved,
    createdBy,
    updatedBy,
    closedBy,
    createdAt,
  } = bug;

  const isAdmin = user?.id === bug?.createdBy.id;

  const handleBugDelete = () => {
    console.log('testing delete');
    dispatch(deleteBug(projectId, bugId));
    history.push(`/projects/${projectId}`);
  };

  const adminButtons = () => {
    if (!isAdmin) return null;

    return (
      <ConfirmDialog
        title="Delete Bug"
        bodyContent="Do you want to permanently delete your bug?"
        buttonText="Delete Bug"
        buttonType={{
          type: 'normal',
          text: 'Delete Bug',
          icon: DeleteOutlineIcon,
        }}
        actionFunction={handleBugDelete}
      ></ConfirmDialog>
    );
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.body}>
        <div>
          <h3>Description</h3>
          <Typography>{description}</Typography>
        </div>
        <div>
          <h3>Bug Details</h3>
          <Typography>Created By: {createdBy.username}</Typography>
          <Typography>Created On {bug && formatDateTime(createdAt)}</Typography>
          <Typography>Priority: {priority}</Typography>
          <Typography>Status: {isResolved ? 'Open' : 'Closed'}</Typography>
        </div>
        {adminButtons()}
      </Paper>
    </div>
  );
};

export default BugPage;

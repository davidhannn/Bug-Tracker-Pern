import { Fragment } from 'react';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { Paper, Typography } from '@material-ui/core';
import { selectAuthState } from '../../redux/slices/authSlice';
import {
  selectBugById,
  deleteBug,
  resolveBug,
} from '../../redux/slices/bugSlice';
import { formatDateTime } from '../../utils/helper';

import { useBugPageStyles } from '../../styles/muiStyles';

import ConfirmDialog from '../../components/confirm-dialog/confirm-dialog.component';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import RedoIcon from '@material-ui/icons/Redo';

import { priorityStyles, statusStyles } from '../../styles/buttonStyles';

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

  const handleBugReopen = () => {
    console.log('testing bug reopen');
    dispatch(resolveBug(projectId, bugId, 'reopen'));
  };

  const handleBugClose = () => {
    console.log('testing bug close');
    dispatch(resolveBug(projectId, bugId, 'close'));
  };

  const adminButtons = () => {
    if (!isAdmin) return null;

    return (
      <Fragment>
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
        {isResolved ? (
          <ConfirmDialog
            title="Re-open Bug"
            bodyContent="Do you want to re-open your bug?"
            buttonText="Re-open Bug"
            buttonType={{
              type: 'normal',
              text: 'Re-open Bug',
              icon: RedoIcon,
            }}
            actionFunction={handleBugReopen}
          ></ConfirmDialog>
        ) : (
          <ConfirmDialog
            title="Close Bug"
            bodyContent="Do you want to close out your bug?"
            buttonText="Close Bug"
            buttonType={{
              type: 'normal',
              text: 'Close Bug',
              icon: DoneOutlineIcon,
            }}
            actionFunction={handleBugClose}
          ></ConfirmDialog>
        )}
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Paper className={classes.body}>
        <div>
          <h3>Description</h3>
          <Typography>{description}</Typography>
        </div>
        <div className={classes.details}>
          <h3>Bug Details</h3>
          <Typography>Created By: {createdBy.username}</Typography>
          <Typography>Created On {bug && formatDateTime(createdAt)}</Typography>
          <Typography>
            Priority:
            <div
              style={{
                ...priorityStyles(bug.priority),
                textTransform: 'capitalize',
                display: 'inline',
              }}
            >
              {priority}
            </div>
          </Typography>

          <Typography>
            Status:
            <div
              style={{
                ...statusStyles(bug.isResolved),
                display: 'inline',
              }}
            >
              {bug.isResolved ? 'Closed' : 'Open'}
            </div>
          </Typography>
        </div>
      </Paper>
      <div className={classes.buttons}>{adminButtons()}</div>
    </Fragment>
  );
};

export default BugPage;

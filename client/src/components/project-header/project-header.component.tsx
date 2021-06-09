import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Paper, Typography, useMediaQuery } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useHeaderStyles } from '../../styles/muiStyles';

import { selectAuthState } from '../../redux/slices/authSlice';
import { deleteProject } from '../../redux/slices/projectSlice';
import { ProjectState } from '../../redux/types';
import ConfirmDialog from '../confirm-dialog/confirm-dialog.component';
import FormDialog from '../form-dialog/form-dialog.component';
import { formatDateTime } from '../../utils/helper';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const ProjectHeader: React.FC<{ currentProject: ProjectState }> = ({
  currentProject,
}) => {
  const classes = useHeaderStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthState);
  const { createdAt, createdBy, id, members, name, updatedAt } = currentProject;

  const isAdmin = user?.id === createdBy.id;

  // const adminButtons = () => {
  //   if (!isAdmin) return null;

  //   return (

  //   )

  // };

  const handleProjectDelete = () => {
    dispatch(deleteProject(id));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.headerPaper}>
        <div>
          <Typography>{name}</Typography>
          {isAdmin ? (
            <FormDialog
              title="Edit Project Name"
              buttonType={{ type: 'icon', icon: EditIcon, size: 'small' }}
            >
              <h1>testing</h1>
            </FormDialog>
          ) : null}
          <Typography>Admin: {createdBy.username} </Typography>
          <Typography>Created On: {formatDateTime(createdAt)}</Typography>
        </div>
        <div>
          {isAdmin ? (
            <ConfirmDialog
              title="Confirm Delete Project"
              bodyContent="Do you want to permanently delete your project?"
              buttonText="Delete Project"
              buttonType={{
                type: 'normal',
                text: 'Delete Project',
                icon: DeleteOutlineIcon,
              }}
              actionFunction={handleProjectDelete}
            />
          ) : null}
        </div>
      </Paper>
    </div>
  );
};

export default ProjectHeader;

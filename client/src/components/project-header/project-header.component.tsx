import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Paper, Typography, useMediaQuery } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useHeaderStyles } from '../../styles/muiStyles';

import { useHistory } from 'react-router-dom';
import { selectAuthState } from '../../redux/slices/authSlice';
import { deleteProject } from '../../redux/slices/projectSlice';
import { ProjectState } from '../../redux/types';
import ConfirmDialog from '../confirm-dialog/confirm-dialog.component';
import FormDialog from '../form-dialog/form-dialog.component';
import { formatDateTime } from '../../utils/helper';

import ProjectForm from '../project-form/project-form.component';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GroupIcon from '@material-ui/icons/Group';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const ProjectHeader: React.FC<{ currentProject: ProjectState }> = ({
  currentProject,
}) => {
  const classes = useHeaderStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector(selectAuthState);
  const { createdAt, createdBy, id, members, name, updatedAt } = currentProject;

  const isAdmin = user?.id === createdBy.id;

  const adminButtons = () => {
    if (!isAdmin) return null;

    return (
      <>
        <div className={classes.buttonWrapper}>
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
        </div>
        <FormDialog
          title="Add Project Members"
          buttonType={{
            type: 'normal',
            text: 'Add Members',
            icon: GroupIcon,
          }}
        >
          <ProjectForm editMode="members" projectId={id} />
        </FormDialog>
      </>
    );
  };

  const handleProjectDelete = () => {
    dispatch(deleteProject(id, history));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.headerPaper}>
        <div className={classes.title}>
          <Typography style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {name}
          </Typography>
          {isAdmin ? (
            <FormDialog
              title="Edit Project Name"
              buttonType={{ type: 'icon', icon: EditIcon, size: 'small' }}
            >
              <ProjectForm editMode="name" currentName={name} projectId={id} />
            </FormDialog>
          ) : null}
        </div>

        <Typography>Admin: {createdBy.username}</Typography>
        <Typography>Created On: {formatDateTime(createdAt)}</Typography>
        {/* <div className={classes.memberAvatars}>
          <Typography>Members:</Typography>

          <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </AvatarGroup>
        </div> */}
        <div className={classes.adminButtons}>{adminButtons()}</div>
      </Paper>
    </div>
  );
};

export default ProjectHeader;

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Divider, Typography, Link } from '@material-ui/core';
import { ProjectState } from '../../redux/types';
import { useHomePageStyles } from '../../styles/muiStyles';
import { formatDateTime } from '../../utils/helper';

import BugReportIcon from '@material-ui/icons/BugReport';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';

const ProjectsTableMobile: React.FC<{ projects: ProjectState[] }> = ({
  projects,
}) => {
  const classes = useHomePageStyles();

  return (
    <div>
      <Divider />
      {projects.map((project, i) => (
        <div key={project.id}>
          <div className={classes.itemWrapper}>
            <Link
              component={RouterLink}
              to={`/projects/${project.id}`}
              variant="h6"
            >
              {project.name}
            </Link>
            <Typography variant="body1">
              Admin: <strong>{project.createdBy.username}</strong>
            </Typography>
            <Typography>
              Created: <strong>{formatDateTime(project.createdAt)}</strong>
            </Typography>
            <div className={classes.flexedWrapper}>
              <div className={classes.iconWrapper}>
                <div className={classes.iconText}>
                  <BugReportIcon />
                  <Typography>: {project.bugs.length}</Typography>
                </div>
                <div className={classes.iconText}>
                  <PeopleAltTwoToneIcon />
                  <Typography>: {project.members.length}</Typography>
                </div>
              </div>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default ProjectsTableMobile;

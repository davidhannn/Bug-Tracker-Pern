import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Divider, Typography, Link } from '@material-ui/core';
import { BugState } from '../../redux/types';
import { useHomePageStyles } from '../../styles/muiStyles';
import { priorityStyles, statusStyles } from '../../styles/buttonStyles';

import { formatDateTime } from '../../utils/helper';

const BugsTableMobile: React.FC<{ bugs: BugState[] }> = ({ bugs }) => {
  const classes = useHomePageStyles();
  return (
    <div>
      <Divider />
      {bugs.map((bug, i) => (
        <div key={bug.id}>
          <div className={classes.itemWrapper}>
            <Link
              component={RouterLink}
              to={`/projects/${bug.projectId}/bugs/${bug.id}`}
              variant="h6"
            >
              {bug.name}
            </Link>
            <Typography>
              Priority:{' '}
              <div
                style={{
                  ...priorityStyles(bug.priority),
                  textTransform: 'capitalize',
                  display: 'inline',
                  padding: '0.15em 0.4em',
                }}
              >
                {bug.priority}
              </div>
            </Typography>
            <Typography>
              Status:{' '}
              <div
                style={{
                  ...statusStyles(bug.isResolved),
                  textTransform: 'capitalize',
                  display: 'inline',
                  padding: '0.15em 0.4em',
                }}
              >
                {bug.isResolved ? 'Closed' : 'Open'}
              </div>
            </Typography>
            <Typography variant="body1">
              Admin: <strong>{bug.createdBy.username}</strong>
            </Typography>
            <Typography>
              Created: <strong>{formatDateTime(bug.createdAt)}</strong>
            </Typography>
            <div className={classes.flexedWrapper}>
              <div className={classes.iconWrapper}>
                <div className={classes.iconText}>
                  {/* <BugReportIcon />
                  <Typography>: {project.bugs.length}</Typography>
                </div>
                <div className={classes.iconText}>
                  <PeopleAltTwoToneIcon />
                  <Typography>: {project.members.length}</Typography> */}
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

export default BugsTableMobile;

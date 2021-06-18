import React from 'react';
import { Paper, Typography, useMediaQuery, useTheme } from '@material-ui/core';

import { BugState } from '../../redux/types';
import { useHeaderStyles } from '../../styles/muiStyles';
import { formatDateTime } from '../../utils/helper';
import { priorityStyles, statusStyles } from '../../styles/buttonStyles';

const BugDetailsMobile: React.FC<{ bug: BugState }> = ({ bug }) => {
  const classes = useHeaderStyles();

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

  return (
    <div>
      <Paper className={classes.root}>
        <div className={classes.mobileWrapper}>
          <div className={classes.mobileDescription}>
            <Typography style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              Description
            </Typography>
            <Typography>{description}</Typography>
          </div>
          <div className={classes.mobileDescription}>
            <Typography style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              Bug Details
            </Typography>
            <Typography>Created By: {createdBy.username}</Typography>
            <Typography>
              Created On {bug && formatDateTime(createdAt)}
            </Typography>
            <Typography>
              Priority:
              <div
                style={{
                  ...priorityStyles(bug.priority),
                  textTransform: 'capitalize',
                  display: 'inline',
                  padding: '0.15em 0.4em',
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
                  padding: '0.15em 0.4em',
                }}
              >
                {bug.isResolved ? 'Closed' : 'Open'}
              </div>
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default BugDetailsMobile;

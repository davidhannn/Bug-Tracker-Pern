import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { formatDateTime } from '../../utils/helper';
import { selectBugsState } from '../../redux/slices/bugSlice';
import { priorityStyles, statusStyles } from '../../styles/buttonStyles';
import { useTableStyles } from '../../styles/muiStyles';

const BugsTable = ({ projectId }: { projectId: string }) => {
  const classes = useTableStyles();
  const history = useHistory();
  const { bugs } = useSelector(selectBugsState);

  const singleBugs = bugs[projectId];
  console.log(singleBugs);
  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Added</TableCell>
              {/* <TableCell align="right">Updated</TableCell> */}
              <TableCell align="right">Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {singleBugs &&
              singleBugs.map((bug) => (
                <TableRow key={bug.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.clickableCell}
                    onClick={() =>
                      history.push(`/projects/${projectId}/bugs/${bug.id}`)
                    }
                  >
                    {bug.name}
                  </TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        ...priorityStyles(bug.priority),
                        textTransform: 'capitalize',
                        margin: '0 auto',
                      }}
                    >
                      {bug.priority}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        ...statusStyles(bug.isResolved),
                        margin: '0 auto',
                      }}
                    >
                      {bug.isResolved ? 'Closed' : 'Open'}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    {formatDateTime(bug.createdAt)}
                  </TableCell>
                  <TableCell align="right">{bug.createdBy.username}</TableCell>
                  {/* <TableCell align="right">{bug.protein}</TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BugsTable;

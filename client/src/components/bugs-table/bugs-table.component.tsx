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

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function BugsTable({ projectId }: { projectId: string }) {
  const classes = useStyles();
  const history = useHistory();
  const { bugs } = useSelector(selectBugsState);

  const singleBugs = bugs[projectId];
  console.log(singleBugs);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="center">Priority</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="right">Added</StyledTableCell>
            {/* <StyledTableCell align="right">Updated</StyledTableCell> */}
            <StyledTableCell align="right">Created By</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {singleBugs &&
            singleBugs.map((bug) => (
              <StyledTableRow key={bug.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  onClick={() =>
                    history.push(`/projects/${projectId}/bugs/${bug.id}`)
                  }
                >
                  {bug.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    style={{
                      ...priorityStyles(bug.priority),
                      textTransform: 'capitalize',
                      margin: '0 auto',
                    }}
                  >
                    {bug.priority}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div
                    style={{
                      ...statusStyles(bug.isResolved),
                      margin: '0 auto',
                    }}
                  >
                    {bug.isResolved ? 'Closed' : 'Open'}
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatDateTime(bug.createdAt)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {bug.createdBy.username}
                </StyledTableCell>
                {/* <StyledTableCell align="right">{bug.protein}</StyledTableCell> */}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

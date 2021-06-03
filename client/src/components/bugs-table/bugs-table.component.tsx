import React from 'react';
import { useSelector } from 'react-redux';
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

import { selectBugsState } from '../../redux/slices/bugSlice';

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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function BugsTable({ projectId }: { projectId: string }) {
  const classes = useStyles();

  const { bugs } = useSelector(selectBugsState);

  const singleBugs = bugs[projectId];
  console.log(singleBugs);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Priority</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Added</StyledTableCell>
            <StyledTableCell align="right">Updated</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {singleBugs &&
            singleBugs.map((bug) => (
              <StyledTableRow key={bug.id}>
                <StyledTableCell component="th" scope="row">
                  {bug.name}
                </StyledTableCell>
                <StyledTableCell align="right">{bug.priority}</StyledTableCell>
                <StyledTableCell align="right">
                  {!bug.isResolved ? <p>Open</p> : <p>Closed</p>}
                </StyledTableCell>
                <StyledTableCell align="right">{bug.createdAt}</StyledTableCell>
                {/* <StyledTableCell align="right">{bug.protein}</StyledTableCell> */}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

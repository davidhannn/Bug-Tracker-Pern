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

import BugReportIcon from '@material-ui/icons/BugReport';
import PersonIcon from '@material-ui/icons/Person';

import { selectProjectsState } from '../../redux/slices/projectSlice';

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

const ProjectsTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const { projects } = useSelector(selectProjectsState);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Project Name</StyledTableCell>
            <StyledTableCell align="right">Bugs</StyledTableCell>
            <StyledTableCell align="right">Members</StyledTableCell>
            <StyledTableCell align="right">Admin</StyledTableCell>
            <StyledTableCell align="right">Added</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects &&
            projects.map((project, i) => (
              <StyledTableRow key={project.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  onClick={() => history.push(`/projects/${project.id}`)}
                >
                  {project.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <BugReportIcon />
                  {project && project.bugs.length}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <PersonIcon />
                  {project && project.members.length}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {project && project.createdBy.username}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {/* {project.createdBy[0]} */}
                  {project.createdAt}
                </StyledTableCell>
                {/* <StyledTableCell align="right">{project.carbs}</StyledTableCell> */}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;

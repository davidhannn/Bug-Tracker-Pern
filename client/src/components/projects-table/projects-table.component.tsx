import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { formatDateTime } from '../../utils/helper';

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
import { ProjectState } from '../../redux/types';
import { useTableStyles } from '../../styles/muiStyles';

// const StyledTableCell = withStyles((theme: Theme) =>
//   createStyles({
//     head: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     body: {
//       fontSize: 14,
//     },
//   })
// )(TableCell);

// const StyledTableRow = withStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//       },
//     },
//   })
// )(TableRow);

// const useStyles = makeStyles({
//   table: {
//     minWidth: 700,
//   },
// });

const ProjectsTable: React.FC<{ projects: ProjectState[] }> = ({
  projects,
}) => {
  const classes = useTableStyles();
  const history = useHistory();
  // const { projects } = useSelector(selectProjectsState);

  const { StyledTableCell, StyledTableRow } = classes;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell align="right">Bugs</TableCell>
            <TableCell align="right">Members</TableCell>
            <TableCell align="right">Admin</TableCell>
            <TableCell align="right">Added</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects &&
            projects.map((project, i) => (
              <TableRow key={project.id} className={StyledTableRow}>
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => history.push(`/projects/${project.id}`)}
                >
                  {project.name}
                </TableCell>
                <TableCell align="right">
                  <BugReportIcon />
                  {/* {project && project.bugs.length} */}
                </TableCell>
                <TableCell align="right">
                  <PersonIcon />
                  {/* {project && project.members.length} */}
                </TableCell>
                <TableCell align="right">
                  {project && project.createdBy.username}
                </TableCell>
                <TableCell align="right">
                  {/* {project.createdBy[0]} */}
                  {formatDateTime(project.createdAt)}
                </TableCell>
                {/* <StyledTableCell align="right">{project.carbs}</StyledTableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectsTable;

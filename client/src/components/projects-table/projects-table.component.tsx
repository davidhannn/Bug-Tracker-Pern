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

// import { selectProjectsState } from '../../redux/slices/projectSlice';
// import { selectProjectsState } from '../../redux/slices/projectSlice';
import { selectAuthState } from '../../redux/slices/authSlice';
import { ProjectState } from '../../redux/types';
import { useTableStyles } from '../../styles/muiStyles';

const ProjectsTable: React.FC<{ projects: ProjectState[] }> = ({
  projects,
}) => {
  const classes = useTableStyles();
  const history = useHistory();
  const { user } = useSelector(selectAuthState);

  return (
    <div className={classes.root}>
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
            {projects.map((project, i) => (
              <TableRow key={project.id}>
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => history.push(`/projects/${project.id}`)}
                  className={classes.clickableCell}
                >
                  {project.name}
                </TableCell>
                <TableCell align="right">
                  {/* <BugReportIcon /> */}
                  {project.bugs.length}
                </TableCell>
                <TableCell align="right">
                  {/* <PersonIcon /> */}
                  {project.members.length}
                </TableCell>
                <TableCell align="right">
                  {project.createdBy.username}
                </TableCell>
                <TableCell align="right">
                  {formatDateTime(project.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectsTable;

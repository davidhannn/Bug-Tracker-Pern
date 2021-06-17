import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Paper, useMediaQuery } from '@material-ui/core';

import ProjectsTable from '../../components/projects-table/projects-table.component';
// import ProjectButton from '../../components/project-button/project-button.component';
// import ProjectHeader from '../../components/project-header/project-header.component';
import AddIcon from '@material-ui/icons/Add';
import Spinner from '../../components/spinner/spinner.component';
// import ProjectCreate from '../../components/project-create/project-create.component';

import FormDialog from '../../components/form-dialog/form-dialog.component';
import ProjectForm from '../../components/project-form/project-form.component';

import { fetchProjects } from '../../redux/slices/projectSlice';

import { selectProjectsState } from '../../redux/slices/projectSlice';

import { useHomePageStyles } from '../../styles/muiStyles';

import Axios from 'axios';
import { useTheme } from '@material-ui/core/styles';
import ProjectsTableMobile from '../../components/projects-table-mobile/projects-table-mobile.component';

const HomePage = () => {
  const { projects, fetchStatus, fetchError } =
    useSelector(selectProjectsState);
  const classes = useHomePageStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    // dispatch(fetchProjects());
  }, [projects]);

  const projectDisplay = () => {
    if (fetchStatus === 'loading') {
      return <Spinner />;
    } else {
      return (
        <div className={classes.projectsListTable}>
          {!isMobile ? (
            <ProjectsTable projects={projects} />
          ) : (
            <ProjectsTableMobile projects={projects} />
          )}
        </div>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.body} elevation={3}>
        <FormDialog
          title="Create Project"
          buttonType={{ type: 'normal', text: 'Create Project', icon: AddIcon }}
        >
          <ProjectForm editMode="project" />
        </FormDialog>
        {/* 
        {fetchStatus === 'loading' ? (
          <Spinner />
        ) : (
          <ProjectsTable projects={projects} />
        )} */}
        {projectDisplay()}
      </Paper>
    </div>
  );
};

export default HomePage;

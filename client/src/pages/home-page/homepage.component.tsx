import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Paper } from '@material-ui/core';

import ProjectsTable from '../../components/projects-table/projects-table.component';
import ProjectButton from '../../components/project-button/project-button.component';
// import ProjectHeader from '../../components/project-header/project-header.component';
import AddIcon from '@material-ui/icons/Add';
import Spinner from '../../components/spinner/spinner.component';
import ProjectCreate from '../../components/project-create/project-create.component';

import FormDialog from '../../components/form-dialog/form-dialog.component';
import ProjectForm from '../../components/project-form/project-form.component';

import { fetchProjects } from '../../redux/slices/projectSlice';

import { selectProjectsState } from '../../redux/slices/projectSlice';

import { useHomePageStyles } from '../../styles/muiStyles';

import Axios from 'axios';

const HomePage = () => {
  const { projects, fetchStatus, fetchError } =
    useSelector(selectProjectsState);
  const classes = useHomePageStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchProjects());
  }, [projects]);

  return (
    <div className={classes.root}>
      <Paper className={classes.body} elevation={3}>
        <FormDialog
          title="Create Project"
          buttonType={{ type: 'normal', text: 'Create Project', icon: AddIcon }}
        >
          <ProjectForm editMode="project" />
        </FormDialog>

        {fetchStatus === 'loading' ? (
          <Spinner />
        ) : (
          <ProjectsTable projects={projects} />
        )}
      </Paper>
    </div>
  );
};

export default HomePage;

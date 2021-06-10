import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import Axios from 'axios';

const HomePage = () => {
  const { projects, fetchStatus, fetchError } =
    useSelector(selectProjectsState);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchProjects());
  }, [projects]);

  return (
    <Fragment>
      {/* <ProjectCreate /> */}
      <FormDialog
        title="Create Project"
        buttonType={{ type: 'normal', text: 'Create Project', icon: AddIcon }}
      >
        <ProjectForm editMode="project" />
      </FormDialog>
      {/* <ProjectButton /> */}
      {fetchStatus === 'loading' ? (
        <Spinner />
      ) : (
        <ProjectsTable projects={projects} />
      )}
    </Fragment>
  );
};

export default HomePage;

import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProjectsTable from '../../components/projects-table/projects-table.component';
import ProjectButton from '../../components/project-button/project-button.component';
// import ProjectHeader from '../../components/project-header/project-header.component';
import Spinner from '../../components/spinner/spinner.component';

import { fetchProjects } from '../../redux/slices/projectSlice';

import { selectProjectsState } from '../../redux/slices/projectSlice';

import Axios from 'axios';

const HomePage = () => {
  const { projects, fetchStatus, fetchError } =
    useSelector(selectProjectsState);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchProjects());
  }, []);

  return (
    <Fragment>
      <ProjectButton />
      {fetchStatus === 'loading' ? <Spinner /> : <ProjectsTable />}
    </Fragment>
  );
};

export default HomePage;

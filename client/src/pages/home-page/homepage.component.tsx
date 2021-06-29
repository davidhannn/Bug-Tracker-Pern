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
import ProjectsSearchSort from '../../components/projects-search-sort/projects-search-sort.component';

import { fetchProjects } from '../../redux/slices/projectSlice';

import { selectProjectsState } from '../../redux/slices/projectSlice';

import { useHomePageStyles } from '../../styles/muiStyles';
import sortProjects from '../../utils/sortProject';

import Axios from 'axios';
import { useTheme } from '@material-ui/core/styles';
import ProjectsTableMobile from '../../components/projects-table-mobile/projects-table-mobile.component';

const HomePage = () => {
  const { projects, fetchStatus, fetchError, sortBy } =
    useSelector(selectProjectsState);
  const classes = useHomePageStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [searchText, setSearchText] = useState('');

  const filteredSortedProjects = sortProjects(
    projects.filter((project) =>
      project.name.toLowerCase().includes(searchText.toLowerCase())
    ),
    sortBy
  );

  // useEffect(() => {
  //   // dispatch(fetchProjects());
  // }, [projects]);

  const projectDisplay = () => {
    if (fetchStatus === 'loading') {
      return <Spinner />;
    } else {
      return (
        <div className={classes.projectsListTable}>
          {!isMobile ? (
            <ProjectsTable projects={filteredSortedProjects} />
          ) : (
            <ProjectsTableMobile projects={filteredSortedProjects} />
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
        <ProjectsSearchSort
          searchText={searchText}
          setSearchText={setSearchText}
          isMobile={isMobile}
        />
        {projectDisplay()}
      </Paper>
    </div>
  );
};

export default HomePage;

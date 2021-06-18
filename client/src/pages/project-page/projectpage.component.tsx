import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import BugsTable from '../../components/bugs-table/bugs-table.component';
import BugsCreate from '../../components/bugs-create/bugs-create.component';
import ProjectHeader from '../../components/project-header/project-header.component';

import AddIcon from '@material-ui/icons/Add';

import { selectProjectById } from '../../redux/slices/projectSlice';
import {
  fetchBugs,
  selectBugsStateForProject,
  selectBugsState,
} from '../../redux/slices/bugSlice';

import BugForm from '../../components/bug-form/bug-form.component';
import Spinner from '../../components/spinner/spinner.component';
import FormDialog from '../../components/form-dialog/form-dialog.component';
import BugsTableMobile from '../../components/bugs-table-mobile/bugs-table-mobile.component';

import { useTheme, useMediaQuery } from '@material-ui/core';
interface ParamTypes {
  projectId: string;
}

const ProjectPage = () => {
  const { projectId } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const currentProject = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  const { fetchStatus } = useSelector(selectBugsState);

  const bugs = useSelector((state: RootState) =>
    selectBugsStateForProject(state, projectId)
  );

  useEffect(() => {
    dispatch(fetchBugs(projectId));
  }, []);

  const bugDisplay = () => {
    if (fetchStatus === true) {
      return <Spinner />;
    } else {
      return !isMobile ? (
        <BugsTable projectId={projectId} />
      ) : (
        <BugsTableMobile bugs={bugs} />
      );
    }
  };

  return (
    <Fragment>
      {currentProject && currentProject ? (
        <ProjectHeader currentProject={currentProject} />
      ) : null}
      <FormDialog
        title="Add a Bug"
        buttonType={{ type: 'normal', text: 'Add a Bug', icon: AddIcon }}
      >
        <BugForm editMode="add" projectId={projectId} />
      </FormDialog>
      {bugDisplay()}
    </Fragment>
  );
};

export default ProjectPage;

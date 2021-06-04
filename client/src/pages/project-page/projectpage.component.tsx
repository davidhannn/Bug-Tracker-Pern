import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import BugsTable from '../../components/bugs-table/bugs-table.component';
import BugsCreate from '../../components/bugs-create/bugs-create.component';
import ProjectHeader from '../../components/project-header/project-header.component';

import { selectProjectById } from '../../redux/slices/projectSlice';
import { fetchBugs } from '../../redux/slices/bugSlice';

interface ParamTypes {
  projectId: string;
}

const ProjectPage = () => {
  const { projectId } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const currentProject = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  useEffect(() => {
    dispatch(fetchBugs(projectId));
    console.log(currentProject);
  }, []);

  return (
    <Fragment>
      {currentProject && currentProject ? (
        <ProjectHeader currentProject={currentProject} />
      ) : null}
      <BugsCreate projectId={projectId} />
      <BugsTable projectId={projectId} />
    </Fragment>
  );
};

export default ProjectPage;

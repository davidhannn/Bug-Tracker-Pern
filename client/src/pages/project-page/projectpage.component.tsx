import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import BugsTable from '../../components/bugs-table/bugs-table.component';
import BugsCreate from '../../components/bugs-create/bugs-create.component';
import ProjectHeader from '../../components/project-header/project-header.component';

import { fetchBugs } from '../../redux/slices/bugSlice';

interface ParamTypes {
  projectId: string;
}

const ProjectPage = () => {
  const { projectId } = useParams<ParamTypes>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBugs(projectId));
  }, []);

  return (
    <Fragment>
      <ProjectHeader />
      <BugsCreate projectId={projectId} />
      <BugsTable projectId={projectId} />
    </Fragment>
  );
};

export default ProjectPage;

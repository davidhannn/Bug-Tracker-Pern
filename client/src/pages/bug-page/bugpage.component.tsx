import React from 'react';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectBugById } from '../../redux/slices/bugSlice';
interface ParamTypes {
  projectId: string;
  bugId: string;
}

const BugPage = () => {
  const { bugId, projectId } = useParams<ParamTypes>();
  const bugData = useSelector((state: RootState) =>
    selectBugById(state, bugId, projectId)
  );

  console.log(bugData);
  return (
    <div>
      <h1>{bugData && bugData.description}</h1>
    </div>
  );
};

export default BugPage;

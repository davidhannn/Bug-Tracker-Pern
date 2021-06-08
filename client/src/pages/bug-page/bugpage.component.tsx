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
      <h1>Name: {bugData && bugData.name}</h1>
      <h3>Description: {bugData && bugData.description}</h3>
    </div>
  );
};

export default BugPage;

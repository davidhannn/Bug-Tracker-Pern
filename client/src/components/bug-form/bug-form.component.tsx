import React from 'react';

import { BugPriority } from '../../redux/types';

interface CloseBug {
  editMode: 'resolve';
  bugName?: string;
  bugId: string;
  description?: string;
  resolvedStatus: boolean;
  priorityStatus?: BugPriority;
}

interface UpdateBug {
  editMode: 'update';
  bugName: string;
  bugId: string;
  description: string;
  resolvedStatus?: boolean;
  priorityStatus?: BugPriority;
}

interface DeleteBug {
  editMode: 'delete';
  bugName?: string;
  bugId: string;
  description?: string;
  resolvedStatus?: boolean;
  priorityStatus?: BugPriority;
}

type BugFormTypes = CloseBug | UpdateBug | DeleteBug;

const BugForm: React.FC<BugFormTypes> = ({
  editMode,
  bugName,
  bugId,
  description,
  resolvedStatus,
  priorityStatus,
}) => {
  return <form></form>;
};

export default BugForm;

export interface UserState {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
}

export interface CredentialsPayload {
  username: string;
  password: string;
}

export interface ProjectMember {
  id: number;
  projectId: string;
  memberId: string;
}

export interface User {
  id: string;
  username: string;
}

export interface ProjectState {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  createdBy: User;
  members: ProjectMember[];
  bugs: BugState[];
}

export interface ProjectPayload {
  name: string;
  members?: string[];
}

export type BugPriority = 'Low' | 'Medium' | 'High';

export interface BugState {
  id: string;
  projectId: string;
  name: string;
  description: string;
  priority: BugPriority;
  isResolved: boolean;
  createdBy: User;
  updatedBy?: User;
  closedBy?: User;
  createdAt: Date;
}

export interface BugPayload {
  name: string;
  description: string;
  priority: BugPriority;
}

export type ProjectSortValues =
  | 'newest'
  | 'oldest'
  | 'most-bugs'
  | 'least-bugs'
  | 'most-members'
  | 'least-members';

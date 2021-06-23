import express from 'express';
import {
  createProject,
  getProjects,
  getProject,
  deleteProject,
  editProjectName,
} from '../controllers/projects';

import auth from '../middleware/auth';
import user from '../middleware/user';

const router = express.Router();

router.post('/', user, auth, createProject);
router.get('/', getProjects);
router.get('/:projectId', getProject);
router.delete('/:projectId', user, auth, deleteProject);
router.put('/:projectId', user, auth, editProjectName);

export default router;

import express from 'express';
import {
  createProject,
  getProjects,
  getProject,
  deleteProject,
} from '../controllers/projects';

import auth from '../middleware/auth';
import user from '../middleware/user';

const router = express.Router();

router.post('/', user, auth, createProject);
router.get('/', getProjects);
router.get('/:projectId', getProject);
router.delete('/:projectId', user, auth, deleteProject);

export default router;

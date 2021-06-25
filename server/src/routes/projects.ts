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

router.post('/', user, createProject);
router.get('/', getProjects);
router.get('/:projectId', getProject);
router.delete('/:projectId', user, deleteProject);
router.put('/:projectId', user, editProjectName);

export default router;

import express from 'express';
import {
  getBugs,
  createBug,
  deleteBug,
  closeBug,
  reopenBug,
} from '../controllers/bugs';

import auth from '../middleware/auth';
import user from '../middleware/user';

const router = express.Router();

// router.post('/', user, auth, createProject);
// router.get('/', getProjects);
router.get('/:projectId/bugs', getBugs);
router.post('/:projectId/bugs', user, createBug);
router.delete('/:projectId/bugs/:bugId', user, deleteBug);
router.post('/:projectId/bugs/:bugId/close', user, closeBug);
router.post('/:projectId/bugs/:bugId/reopen', user, reopenBug);

export default router;

import express from 'express';
import { getBugs, createBug } from '../controllers/bugs';

import auth from '../middleware/auth';
import user from '../middleware/user';

const router = express.Router();

// router.post('/', user, auth, createProject);
// router.get('/', getProjects);
router.get('/:projectId/bugs', getBugs);
router.post('/:projectId/bugs', user, auth, createBug);

export default router;

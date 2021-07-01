import express from 'express';
import { register, login, verifyUser } from '../controllers/auth';

import auth from '../middleware/auth';
import user from '../middleware/user';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', user, verifyUser);

export default router;

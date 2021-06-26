import express from 'express';
import { register, login, verifyUser, logout, test } from '../controllers/auth';

import auth from '../middleware/auth';
import user from '../middleware/user';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', user, verifyUser);
router.get('/logout', user, logout);
router.get('/login', test);

export default router;

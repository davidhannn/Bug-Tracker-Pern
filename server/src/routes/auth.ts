import express from 'express';
import { register, login, verifyUser, logout } from '../controllers/auth';

import auth from '../middleware/auth';
import user from '../middleware/user';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', user, auth, verifyUser);
router.get('/logout', user, auth, logout);

export default router;

import express from 'express';
import { getAllUsers } from '../controllers/user';
import auth from '../middleware/auth';
import user from '../middleware/user';

const router = express.Router();

router.get('/', user, auth, getAllUsers);

export default router;

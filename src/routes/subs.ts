import express from 'express';

import {
  createSub,
  getSub,
  upload,
  ownSub,
  uploadSubImage,
} from '../controllers/subs';

import auth from '../middleware/auth';
import user from '../middleware/user';

const router = express.Router();

router.post('/', user, auth, createSub);
router.get('/:name', user, getSub);
router.post(
  '/:name/image',
  user,
  auth,
  ownSub,
  upload.single('file'),
  uploadSubImage
);

export default router;

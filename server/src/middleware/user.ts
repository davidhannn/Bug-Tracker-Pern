import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/config';
import User from '../entity/User';

interface TokenInterface {
  id: string;
  username: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('x-auth-token');

    // const user: User | undefined = res.locals.user

    if (!token) {
      return res
        .status(401)
        .send({ message: 'No auth token found. Authorization denied.' });
    }

    // const { username }: any = jwt.verify(token, process.env.JWT_SECRET!);

    const decodedToken = jwt.verify(token, JWT_SECRET) as TokenInterface;

    if (!decodedToken.id) {
      return res
        .status(401)
        .send({ message: 'Token verification failed. Authorization denied.' });
    }

    // const user = await User.findOne({ username });

    res.locals.user = decodedToken.id;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: 'Unauthenticated' });
  }
};

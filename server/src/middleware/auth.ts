import { NextFunction, Request, Response } from 'express';

import User from '../entity/User';

export default async (_: Request, res: Response, next: NextFunction) => {
  try {
    const user: User | undefined = res.locals.user;

    if (!user) throw new Error('Unauthenticated');

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: 'Unauthenticated' });
  }
};

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../utils/config';

// interface TokenInterface {
//   id: string;
//   username: string;
// }

// const auth = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.header('x-auth-token');

//     if (!token) {
//       return res
//         .status(401)
//         .send({ message: 'No auth token found. Authorization denied.' });
//     }

//     const decodedToken = jwt.verify(token, JWT_SECRET) as TokenInterface;

//     if (!decodedToken.id) {
//       return res
//         .status(401)
//         .send({ message: 'Token verification failed. Authorization denied.' });
//     }

//     req.user = decodedToken.id;
//     next();
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

// export default auth;

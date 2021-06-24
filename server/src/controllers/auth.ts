import { Request, Response } from 'express';
import User from '../entity/User';
import { isEmpty, validate } from 'class-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { JWT_SECRET } from '../utils/config';

const mapErrors = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Validate data
    let errors: any = {};
    // const emailUser = await User.findOne({ email });
    const usernameUser = await User.findOne({ username });

    // if (emailUser) errors.email = 'Email is already taken';
    if (usernameUser) errors.username = 'Username is already taken';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // Create the user

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = User.create({ username, passwordHash });

    await user.save();

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET
    );

    return res.status(201).json({
      id: user.id,
      username: user.username,
      token,
    });
    // errors = await validate(user);

    // if (errors.length > 0) {
    //   return res.status(400).json(mapErrors(errors));
    // }

    // await user.save();

    // Return the user
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let errors: any = {};

    if (isEmpty(username)) errors.username = 'Username must not be empty';
    if (isEmpty(password)) errors.password = 'Password must not be empty';
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({ password: 'Password is incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET
    );

    // res.set(
    //   'Set-Cookie',
    //   cookie.serialize('token', token, {
    //     httpOnly: true,
    //     // secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'none',
    //     secure: true,
    //     maxAge: 3600,
    //     path: '/',
    //   })
    // );

    return res.status(201).json({
      id: user.id,
      username: user.username,
      token,
    });
  } catch (err) {
    return res.json({ error: 'Something went wrong ' });
  }
};

export const verifyUser = (_: Request, res: Response) => {
  return res.json(res.locals.user);
};

export const logout = (_: Request, res: Response) => {
  res.set(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      secure: true,
      expires: new Date(0),
      path: '/',
    })
  );

  return res.status(200).json({ success: true });
};

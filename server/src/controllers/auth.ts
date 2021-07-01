import { Request, Response } from 'express';
import User from '../entity/User';
import { isEmpty, validate } from 'class-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { JWT_SECRET } from '../utils/config';

import { registerValidator, loginValidator } from '../utils/validators';

const mapErrors = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { errors, valid } = registerValidator(username, password);
  // Validate data
  if (!valid) {
    return res.status(400).send({ message: Object.values(errors)[0] });
  }
  // const emailUser = await User.findOne({ email });
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res
      .status(401)
      .send({ message: `Username '${username}' is already taken.` });
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
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { errors, valid } = loginValidator(username, password);

  if (!valid) {
    return res.status(400).send({ message: Object.values(errors)[0] });
  }

  const user = await User.findOne({ username });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return res.status(401).json({ message: 'Password is incorrect' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);

  return res.status(201).json({
    id: user.id,
    username: user.username,
    token,
  });
};

export const verifyUser = (_: Request, res: Response) => {
  return res.json(res.locals.user);
};

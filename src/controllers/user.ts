import User from '../entity/User';
import { Request, Response } from 'express';
import { Not } from 'typeorm';

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await User.find({
    select: ['id', 'username'],
  });

  res.json(users);
};

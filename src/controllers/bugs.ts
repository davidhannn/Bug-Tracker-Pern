import { Request, response, Response } from 'express';
import Bug from '../entity/Bug';

export const getBugs = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const bugs = await Bug.createQueryBuilder('bug')
    .where('bug.projectId = :projectId', { projectId })
    .leftJoinAndSelect('bug.createdBy', 'createdBy')
    .getMany();

  res.json(bugs);
};

export const createBug = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { name, description, priority } = req.body;

  console.log(req.body);

  try {
    const newBug = Bug.create({
      name,
      description,
      priority,
      isResolved: false,
      projectId,
      createdById: res.locals.user.id,
    });

    await newBug.save();
  } catch (err) {
    console.log(err);
  }
};

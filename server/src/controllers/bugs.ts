import { Request, response, Response } from 'express';
import { resolve } from 'url';
import Bug from '../entity/Bug';
import Project from '../entity/Project';
import User from '../entity/User';

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

  const user: User = res.locals.user;

  console.log(req.body);

  try {
    const newBug = Bug.create({
      name,
      description,
      priority,
      isResolved: false,
      projectId,
      createdById: res.locals.user,
    });

    await newBug.save();
  } catch (err) {
    console.log(err);
  }
};

export const deleteBug = async (req: Request, res: Response) => {
  const { projectId, bugId } = req.params;

  const targetProject = await Project.findOne({ id: projectId });

  if (!targetProject) {
    return res.status(404).send({ message: 'Incorrect Project' });
  }

  const targetBug = await Bug.findOne({ id: bugId });

  if (!targetBug) {
    return res.status(404).send({ message: 'Invalid bug ID.' });
  }

  await targetBug.remove();
  return res.status(204).end();
};

export const closeBug = async (req: Request, res: Response) => {
  const { projectId, bugId } = req.params;

  const targetBug = await Bug.findOneOrFail({ id: bugId });

  targetBug.isResolved = true;
  await targetBug.save();

  return res.status(204).end();
};

export const reopenBug = async (req: Request, res: Response) => {
  const { projectId, bugId } = req.params;

  const targetBug = await Bug.findOneOrFail({ id: bugId });

  targetBug.isResolved = false;
  await targetBug.save();
  return res.status(204).end();
};

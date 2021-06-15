import { Request, response, Response } from 'express';
import Bug from '../entity/Bug';
import Project from '../entity/Project';

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

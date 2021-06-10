import { Request, Response } from 'express';
import Member from '../entity/Member';
import Project from '../entity/Project';
import User from '../entity/User';
import Bug from '../entity/Bug';

const fieldsToSelect = [
  'project.id',
  'project.name',
  'project.createdAt',
  'project.updatedAt',
  'createdBy.id',
  'createdBy.username',
  'members.id',
  'members.joinedAt',
  'member.id',
  'member.username',
  'bug.id',
];

export const createProject = async (req: Request, res: Response) => {
  const { name } = req.body;
  const membersIds = req.body.members;
  // const user: User = res.locals.user;

  try {
    const newProject = Project.create({
      name,
      createdById: res.locals.user.id,
    });

    await newProject.save();

    const membersArray = membersIds.map((memberId: string) => ({
      memberId: memberId,
      projectId: newProject.id,
    }));

    await Member.insert(membersArray);

    const queriedProject = await Project.createQueryBuilder('project')
      .where('project.id = :id', { id: newProject.id })
      .leftJoinAndSelect('project.members', 'members')
      .leftJoinAndSelect('project.createdBy', 'createdBy')
      .leftJoinAndSelect('members.member', 'member')
      .getOne();

    return res.json(queriedProject);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error creating project' });
  }
};

export const getProjects = async (_: Request, res: Response) => {
  try {
    // const projects = await Project.find({
    //   order: { createdAt: 'DESC' },
    // });

    const projects = await Project.createQueryBuilder('project')
      // .leftJoin('project.members', 'projectMember')
      // .where('projectMember.projectId = project.id')
      .leftJoinAndSelect('project.members', 'members')
      .leftJoinAndSelect('project.createdBy', 'createdBy')
      .leftJoinAndSelect('members.member', 'member')
      .leftJoinAndSelect('project.bugs', 'bugs')
      .getMany();

    return res.json(projects);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Cant retrieve projects' });
  }
};

export const getProject = async (req: Request, res: Response) => {
  const { projectId }: any = req.params;
  try {
    const project = await Project.find({ id: projectId });

    return res.json(project);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: 'Project not found' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId }: any = req.params;

  const projectToDelete = await Project.findOneOrFail({ id: projectId });

  // if(projectToDelete.createdById !== req.locals.user.id) {
  //   return res.status(401).send({ message: 'access is denied'})
  // }

  await Member.delete({ projectId });
  await Bug.delete({ projectId });
  await projectToDelete.remove();
  res.status(204).end();
};

export const editProjectName = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { projectId }: any = req.params;

  const projectToEdit = await Project.findOneOrFail({ id: projectId });

  projectToEdit.name = name;
  await projectToEdit.save();
  res.json(projectToEdit);
};

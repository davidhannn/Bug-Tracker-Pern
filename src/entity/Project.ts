import { Expose } from 'class-transformer';
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Entity from './Entity';
import Member from './Member';
import User from './User';
import Bug from './Bug';

@TOEntity('projects')
export default class Project extends Entity {
  constructor(project: Partial<Project>) {
    super();
    Object.assign(this, project);
  }

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;
  @Column({ nullable: true })
  createdById: string;

  @OneToMany(() => Member, (member) => member.project)
  @JoinColumn()
  members: Member[];

  @OneToMany(() => Bug, (bug) => bug.project)
  @JoinColumn()
  bugs: Bug[];

  @Column({ type: 'varchar', length: 60, nullable: true })
  name: string;
}

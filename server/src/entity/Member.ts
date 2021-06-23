import {
  Entity,
  BaseEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm';

// import Entity from './Entity';
import Project from './Project';
import User from './User';

@Entity('members')
export default class Member extends BaseEntity {
  // constructor(member: Partial<Member>) {
  //   super();
  //   Object.assign(this, member);
  // }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project)
  @JoinColumn({ name: 'projectId' })
  project: Project;
  @Column()
  projectId: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'memberId' })
  member: User;
  @Column({ nullable: true })
  memberId: string;
}

import {
  Entity,
  BaseEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

// import Entity from './Entity';
import Project from './Project';
import User from './User';

type Priority = 'Low' | 'Medium' | 'High';

@Entity('bugs')
export default class Bug extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ['Low', 'Medium', 'High'],
    default: 'Low',
  })
  priority: Priority;

  @Column({ default: false })
  isResolved: boolean;

  @ManyToOne(() => Project, (project) => project)
  @JoinColumn({ name: 'projectId' })
  project: Project;
  @Column()
  projectId: string;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;
  @Column()
  createdById: string;

  @CreateDateColumn()
  createdAt: Date;
}

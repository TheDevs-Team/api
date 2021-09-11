import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User, Course } from '~/models';

import { v4 as uuid } from 'uuid';

@Entity('studentscourses')
export class StudentCourse {
  @PrimaryColumn()
  id: string;

  @JoinColumn({ name: 'course_id' })
  @ManyToOne(() => Course)
  course!: Course;

  @Column()
  course_id!: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user!: User;

  @Column()
  user_id!: string;

  @Column()
  status!: string;

  @CreateDateColumn()
  created_at!: Date;

  @CreateDateColumn()
  updated_at!: Date;

  constructor() {
    this.id = uuid();
    this.status = 'IN_COURSE';
  }
}

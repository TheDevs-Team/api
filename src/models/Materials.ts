import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Course } from './Course';

import { v4 as uuid } from 'uuid';

@Entity('materials')
export class Material {
  @PrimaryColumn()
  id: string;

  @Column()
  name!: string;

  @Column()
  type!: string;

  @Column()
  file!: string;

  @JoinColumn({ name: 'course_id' })
  @ManyToOne(() => Course)
  course!: Course;

  @Column()
  course_id!: string;

  @CreateDateColumn()
  created_at!: Date;

  @CreateDateColumn()
  updated_at!: Date;

  constructor() {
    this.id = uuid();
  }
}

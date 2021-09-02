import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './User';

import { v4 as uuid } from 'uuid';

@Entity('courses')
export class Course {
  @PrimaryColumn()
  id: string;

  @Column()
  name!: string;

  @JoinColumn({ name: 'manager_id' })
  @ManyToOne(() => User)
  user!: User;

  @Column()
  manager_id!: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @CreateDateColumn()
  updated_at!: Date;

  constructor() {
    this.id = uuid();
    this.active = true;
  }
}

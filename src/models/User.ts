import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name!: string;

  @Column()
  document!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  phone!: string;

  @Column()
  type!: string;

  @Column()
  financial_status!: string;

  @Column()
  active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @CreateDateColumn()
  updated_at!: Date;

  constructor() {
    this.id = uuid();
    if (!this.active) this.active = true;
  }
}

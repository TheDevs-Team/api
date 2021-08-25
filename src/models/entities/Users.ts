import { Entity, Column, PrimaryColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('users')
export default class Users {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  document!: string;

  @Column()
  email!: string;

  @Column()
  phone!: number;

  @Column()
  type!: string;

  @Column()
  password!: number;

  @Column()
  active!: boolean;

  constructor() {
    if (!this.id) this.id = uuid();
    if (!this.active) this.active = true;
  }
}

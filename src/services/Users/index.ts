/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCustomRepository, Repository } from 'typeorm';
import { Users } from '../../models/entities';
import { UsersRepository } from '../../repositories';

// interface CreateUserI {
//   name: string;
//   document: string;
//   email: string;
//   phone: string;
//   type: string;
//   password: string;
// }

export default class UsersService {
  private usersRepository: Repository<Users>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create({ document, email, name, password, phone, type }: any) {
    const user = this.usersRepository.create({
      document,
      email,
      name,
      password,
      phone,
      type,
    });

    await this.usersRepository.save(user);

    return user;
  }
}

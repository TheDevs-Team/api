import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../models/entities';

// Criando o repository da entidade Books
@EntityRepository(Users)
export default class UsersRepository extends Repository<Users> {}

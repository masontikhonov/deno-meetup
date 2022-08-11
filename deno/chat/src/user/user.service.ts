import { ObjectId } from '../deps.ts';
import { NotFoundError } from '../errors/not-found.error.ts';

import type { UserRepository } from './user.repository.ts';
import type { User } from '../interfaces/models/user.interface.ts';

export class UserService {
  #repository: UserRepository;

  constructor(repository: UserRepository) {
    this.#repository = repository;
  }

  async getById(id: string): Promise<User> {
    const user = await this.#repository.getById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  getAll(filter?: URLSearchParams): Promise<User[]> {
    if (filter && filter.has('name')) {
      return this.#repository.getAll({ name: filter.get('name')! });
    }
    return this.#repository.getAll();
  }

  async create(data: Omit<User, '_id'>): Promise<User> {
    const userId = await this.#repository.create(data);
    return {
      ...data,
      _id: userId,
    };
  }

  async deleteById(id: string): Promise<void> {
    const isDeleted = await this.#repository.deleteById(id);
    if (isDeleted) {
      return;
    }
    throw new NotFoundError('User not found');
  }

  async updateById(id: string, data: Omit<User, '_id'>): Promise<User> {
    const isUpdated = await this.#repository.updateById(id, data);
    if (isUpdated) {
      return {
        ...data,
        _id: new ObjectId(id),
      };
    }
    throw new NotFoundError('User not found');
  }
}

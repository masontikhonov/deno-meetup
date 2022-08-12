import { BaseRepository } from '../base.repository.ts';
import type { MongoClient } from '../deps.ts';
import type { User } from '../interfaces/models/user.interface.ts';
import type { UserFilter } from './interfaces/user-filter.interface.ts';

export class UserRepository extends BaseRepository<User> {
  constructor(client: MongoClient, collectionName: string) {
    super(client, collectionName);
  }

  public async getAll(filter?: UserFilter): Promise<User[]> {
    try {
      if (filter?.name) {
        return await this.collection.find({ name: filter.name }).toArray();
      }
      return await this.collection.find().toArray();
    } catch (error) {
      this.handleErrors(error);
    }
  }
}

import { Collection, InsertDocument, MongoClient, ObjectId } from './deps.ts';
import { DbError } from './errors/db.error.ts';

import type { BaseModel } from './interfaces/models/base-model.interface.ts';

export abstract class BaseRepository<T extends BaseModel> {
  protected collection: Collection<T>;

  constructor(client: MongoClient, collectionName: string) {
    this.collection = client.database().collection(collectionName);
  }

  protected handleErrors(exception: unknown): never {
    if (exception instanceof Error) {
      throw new DbError('Database access error', { cause: exception });
    }
    throw new DbError('Database access error', {
      cause: new Error(JSON.stringify(exception)),
    });
  }

  protected getObjectId(id: string | ObjectId): ObjectId {
    return id instanceof ObjectId ? id : new ObjectId(id);
  }

  public async getById(id: string | ObjectId): Promise<T | undefined> {
    try {
      return await this.collection.findOne({ _id: this.getObjectId(id) });
    } catch (error) {
      this.handleErrors(error);
    }
  }

  public async getAll(): Promise<T[]> {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      this.handleErrors(error);
    }
  }

  public async create(data: InsertDocument<T>): Promise<ObjectId> {
    try {
      return await this.collection.insertOne(data);
    } catch (error) {
      this.handleErrors(error);
    }
  }

  public async deleteById(id: string | ObjectId): Promise<boolean> {
    try {
      return !!(await this.collection.deleteOne({ _id: this.getObjectId(id) }));
    } catch (error) {
      this.handleErrors(error);
    }
  }

  public async updateById(
    id: string | ObjectId,
    data: Partial<Omit<T, '_id'>>,
  ): Promise<boolean> {
    try {
      // console.log('Real update called: ', data);

      return !!(await this.collection.updateOne(
        { _id: this.getObjectId(id) },
        { $set: data } as any,
      )).modifiedCount;
    } catch (error) {
      this.handleErrors(error);
    }
  }
}

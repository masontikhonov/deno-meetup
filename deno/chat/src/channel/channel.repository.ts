import { BaseRepository } from '../base.repository.ts';
import type { MongoClient } from '../deps.ts';
import type { Channel } from '../interfaces/models/channel.interface.ts';
import type { ChannelFilter } from './interfaces/channel-filter.interface.ts';

export class ChannelRepository extends BaseRepository<Channel> {
  constructor(client: MongoClient, collectionName: string) {
    super(client, collectionName);
  }

  public async getAll(filter?: ChannelFilter): Promise<Channel[]> {
    try {
      if (filter?.ids) {
        const objectIds = filter.ids.map((id) => this.getObjectId(id));
        return await this.collection.find({ _id: { $in: objectIds } })
          .toArray();
      }
      return await this.collection.find().toArray();
    } catch (error) {
      this.handleErrors(error);
    }
  }
}

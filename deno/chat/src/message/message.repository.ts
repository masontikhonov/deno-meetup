import { BaseRepository } from '../base.repository.ts';
import type { MongoClient } from '../deps.ts';
import type { Message } from '../interfaces/models/message.interface.ts';

export class MessageRepository extends BaseRepository<Message> {
  constructor(client: MongoClient, collectionName: string) {
    super(client, collectionName);
  }
}

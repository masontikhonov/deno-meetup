import type { ObjectId } from '../../deps.ts';
import type { BaseModel } from './base-model.interface.ts';

export interface Message extends BaseModel {
  content: string;
  authorId: ObjectId;
  channelId: ObjectId;
  createdAt: Date;
}

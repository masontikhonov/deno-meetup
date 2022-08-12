import type { ObjectId } from '../../deps.ts';
import type { BaseModel } from './base-model.interface.ts';

export interface User extends BaseModel {
  name: string;
  channelIds: ObjectId[];
}

import type { Message } from './message.interface.ts';
import type { BaseModel } from './base-model.interface.ts';

export interface Channel extends BaseModel {
  description: string;
  createdAt: Date;
  recentMessage: Pick<Message, 'content' | 'createdAt'> | null;
}

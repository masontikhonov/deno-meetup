import type { ObjectId } from '../../deps.ts';

export interface ChannelFilter {
  ids?: string[] | ObjectId[];
}

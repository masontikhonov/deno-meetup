import { dateTime, delay, log, ObjectId } from '../deps.ts';
import { NotFoundError } from '../errors/not-found.error.ts';

import type { Channel } from '../interfaces/models/channel.interface.ts';
import type { Message } from '../interfaces/models/message.interface.ts';
import type { ChannelRepository } from './channel.repository.ts';

type Task = (signal: AbortSignal) => Promise<void>;

export class ChannelService {
  readonly #MIN_UPDATE_DELAY_S = 10;

  readonly #updateRecentMessageTasks: [AbortController, Promise<void>][] = [];

  #repository: ChannelRepository;

  constructor(repository: ChannelRepository) {
    this.#repository = repository;
  }

  async getById(id: string): Promise<Channel> {
    const channel = await this.#repository.getById(id);
    if (!channel) {
      throw new NotFoundError('Channel not found');
    }
    return channel;
  }

  getAll(filter?: URLSearchParams): Promise<Channel[]> {
    if (filter && filter.has('ids')) {
      return this.#repository.getAll({ ids: filter.get('ids')!.split(',') });
    }
    return this.#repository.getAll();
  }

  async create(
    data: Omit<Channel, '_id' | 'createdAt' | 'recentMessage'>,
  ): Promise<Channel> {
    const creationData = {
      ...data,
      createdAt: new Date(),
      recentMessage: null,
    };
    const channelId = await this.#repository.create(creationData);
    return {
      ...creationData,
      _id: channelId,
    };
  }

  async deleteById(id: string): Promise<void> {
    const isDeleted = await this.#repository.deleteById(id);
    if (isDeleted) {
      return;
    }
    throw new NotFoundError('Channel not found');
  }

  async updateById(id: string, data: Omit<Channel, '_id'>): Promise<Channel> {
    const isUpdated = await this.#repository.updateById(id, data);
    if (isUpdated) {
      return {
        ...data,
        _id: new ObjectId(id),
      };
    }
    throw new NotFoundError('Channel not found');
  }

  async updateRecentMessage(message: Message): Promise<void> {
    const latestChannelUpdate =
      (await this.#repository.getById(message.channelId))
        ?.recentMessage?.createdAt;

    const diffInS = latestChannelUpdate
      ? dateTime.difference(message.createdAt, latestChannelUpdate)
        .seconds!
      : Infinity;

    const delayS = diffInS > this.#MIN_UPDATE_DELAY_S ? 0 : diffInS;

    const previousTask = this.#updateRecentMessageTasks.pop();
    previousTask && previousTask[0].abort();

    const abortController = new AbortController();
    const task = async (signal: AbortSignal): Promise<void> => {
      await delay(delayS * dateTime.SECOND, { signal });
      await this.#repository.updateById(message.channelId, {
        recentMessage: {
          content: message.content,
          createdAt: message.createdAt,
        },
      });
    };

    this.#updateRecentMessageTasks.push([
      abortController,
      task(abortController.signal).catch((error) => {
        if (
          !(error instanceof Error && error.message === 'Delay was aborted.')
        ) {
          log.error(error);
        }
      }),
    ]);
  }
}

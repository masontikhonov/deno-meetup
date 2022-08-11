import { ObjectId } from '../deps.ts';
import { NotFoundError } from '../errors/not-found.error.ts';
import { EventType } from '../const/event-type.const.ts';

import type { MessageRepository } from './message.repository.ts';
import type { Message } from '../interfaces/models/message.interface.ts';

export class MessageService {
  #repository: MessageRepository;

  constructor(repository: MessageRepository) {
    this.#repository = repository;
  }

  async getById(id: string): Promise<Message> {
    const message = await this.#repository.getById(id);
    if (!message) {
      throw new NotFoundError('Message not found');
    }
    return message;
  }

  getAll(filters?: URLSearchParams): Promise<Message[]> {
    return this.#repository.getAll();
  }

  async create(data: Omit<Message, '_id' | 'createdAt'>): Promise<Message> {
    const creationData = {
      ...data,
      createdAt: new Date(),
    };
    const messageId = await this.#repository.create(creationData);
    const message = { ...creationData, _id: messageId };

    this.#notifyOfCreation(message);
    return message;
  }

  async deleteById(id: string): Promise<void> {
    const isDeleted = await this.#repository.deleteById(id);
    if (isDeleted) {
      return;
    }
    throw new NotFoundError('Message not found');
  }

  async updateById(id: string, data: Omit<Message, '_id'>): Promise<Message> {
    const isUpdated = await this.#repository.updateById(id, data);
    if (isUpdated) {
      return {
        ...data,
        _id: new ObjectId(id),
      };
    }
    throw new NotFoundError('Message not found');
  }

  #notifyOfCreation(message: Message): void {
    dispatchEvent(new CustomEvent(EventType.NewMessage, { detail: message }));
  }
}

import { EventType } from '../const/event-type.const.ts';
import type { Message } from '../interfaces/models/message.interface.ts';
import type { ChannelService } from './channel.service.ts';

export class ChannelEventHandler {
  #service: ChannelService;

  constructor(service: ChannelService) {
    this.#service = service;

    addEventListener(EventType.NewMessage, (event) => {
      this.updateRecentMessage(<any> (<any> event).detail);
    });
  }

  updateRecentMessage(message: Message): void {
    this.#service.updateRecentMessage(message);
  }
}

import './config/dot-env.config.ts';

import { Router } from './router.ts';
import { App } from './app.ts';
import { mongoClient } from './mongo.client.ts';
import { UserRepository } from './user/user.repository.ts';
import { UserService } from './user/user.service.ts';
import { UserController } from './user/user.controller.ts';
import { ChannelRepository } from './channel/channel.repository.ts';
import { ChannelService } from './channel/channel.service.ts';
import { ChannelController } from './channel/channel.controller.ts';
import { MessageRepository } from './message/message.repository.ts';
import { MessageService } from './message/message.service.ts';
import { MessageController } from './message/message.controller.ts';
import { handleErrors } from './utils/handle-errors.ts';
import { ChannelEventHandler } from './channel/channel.event-handler.ts';
import { log, ObjectId } from './deps.ts';

const userRepository = new UserRepository(mongoClient, 'user');
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const channelRepository = new ChannelRepository(mongoClient, 'channel');
const channelService = new ChannelService(channelRepository);
const channelController = new ChannelController(channelService);
const channelEventHandler = new ChannelEventHandler(channelService);

const messageRepository = new MessageRepository(mongoClient, 'message');
const messageService = new MessageService(messageRepository);
const messageController = new MessageController(messageService);

const router = new Router(userController, channelController, messageController);
const app = new App(router, { port: 8080, onError: handleErrors });

app.start();

// let counter = 0;
// setInterval(() => {
//   const message = {
//     content: `message ${counter}! 😱`,
//     authorId: new ObjectId('62f3ffdeabb99af901526772'),
//     channelId: new ObjectId('62f3ff54abb99af901526771'),
//     createdAt: new Date(),
//     _id: new ObjectId('62f419e6eaaa796d7afcf3d4'),
//   };
//   channelEventHandler.updateRecentMessage(message);
//   console.log('Called updateRecentMessage: ', counter);
//   counter += 1;
// }, 3000);

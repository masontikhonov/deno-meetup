import { BaseController } from '../base.controller.ts';
import { generateHttpResponse } from '../decorators/generate-http-response.decorator.ts';

import type { Message } from '../interfaces/models/message.interface.ts';
import type { PathParams } from '../types/path-params.type.ts';
import type { MessageService } from './message.service.ts';

export class MessageController extends BaseController {
  #service: MessageService;

  constructor(service: MessageService) {
    super();

    this.#service = service;

    this.registerHandlers({
      GET: {
        '/messages/:id': this.getById,
        '/messages': this.getAll,
      },
      POST: {
        '/messages': this.create,
      },
      DELETE: {
        '/messages/:id': this.deleteById,
      },
      PUT: {
        '/messages/:id': this.updateById,
      },
    });
  }

  @generateHttpResponse()
  getById(
    pathParams: PathParams,
    _searchParams: URLSearchParams,
    _req: Request,
  ): Promise<Message> {
    return this.#service.getById(pathParams.id);
  }

  @generateHttpResponse()
  getAll(
    _pathParams: PathParams,
    searchParams: URLSearchParams,
    _req: Request,
  ): Promise<Message[]> {
    return this.#service.getAll(searchParams);
  }

  @generateHttpResponse()
  async create(
    _pathParams: PathParams,
    _searchParams: URLSearchParams,
    req: Request,
  ): Promise<Message> {
    return this.#service.create(await req.json());
  }

  @generateHttpResponse()
  deleteById(
    pathParams: PathParams,
    _searchParams: URLSearchParams,
    _req: Request,
  ): Promise<void> {
    return this.#service.deleteById(pathParams.id);
  }

  @generateHttpResponse()
  async updateById(
    pathParams: PathParams,
    _searchParams: URLSearchParams,
    req: Request,
  ): Promise<Message> {
    return this.#service.updateById(
      pathParams.id,
      await req.json(),
    );
  }
}

import { BaseController } from '../base.controller.ts';
import { generateHttpResponse } from '../decorators/generate-http-response.decorator.ts';

import type { Channel } from '../interfaces/models/channel.interface.ts';
import type { PathParams } from '../types/path-params.type.ts';
import type { ChannelService } from './channel.service.ts';

export class ChannelController extends BaseController {
  #service: ChannelService;

  constructor(service: ChannelService) {
    super();

    this.#service = service;

    this.registerHandlers({
      GET: {
        '/channels/:id': this.getById,
        '/channels': this.getAll,
      },
      POST: {
        '/channels': this.create,
      },
      DELETE: {
        '/channels/:id': this.deleteById,
      },
      PUT: {
        '/channels/:id': this.updateById,
      },
    });
  }

  @generateHttpResponse()
  getById(
    pathParams: PathParams,
    _searchParams: URLSearchParams,
    _req: Request,
  ): Promise<Channel> {
    return this.#service.getById(pathParams.id);
  }

  @generateHttpResponse()
  getAll(
    _pathParams: PathParams,
    searchParams: URLSearchParams,
    _req: Request,
  ): Promise<Channel[]> {
    return this.#service.getAll(searchParams);
  }

  @generateHttpResponse()
  async create(
    _pathParams: PathParams,
    _searchParams: URLSearchParams,
    req: Request,
  ): Promise<Channel> {
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
  ): Promise<Channel> {
    return this.#service.updateById(
      pathParams.id,
      await req.json(),
    );
  }
}

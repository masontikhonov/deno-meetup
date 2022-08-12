import { BaseController } from '../base.controller.ts';
import { generateHttpResponse } from '../decorators/generate-http-response.decorator.ts';

import type { User } from '../interfaces/models/user.interface.ts';
import type { PathParams } from '../types/path-params.type.ts';
import type { UserService } from './user.service.ts';

export class UserController extends BaseController {
  #service: UserService;

  constructor(service: UserService) {
    super();

    this.#service = service;

    this.registerHandlers({
      GET: {
        '/users/:id': this.getById,
        '/users': this.getAll,
      },
      POST: {
        '/users': this.create,
      },
      DELETE: {
        '/users/:id': this.deleteById,
      },
      PUT: {
        '/users/:id': this.updateById,
      },
    });
  }

  @generateHttpResponse()
  getById(
    pathParams: PathParams,
    _searchParams: URLSearchParams,
    _req: Request,
  ): Promise<User> {
    return this.#service.getById(pathParams.id);
  }

  @generateHttpResponse()
  getAll(
    _pathParams: PathParams,
    searchParams: URLSearchParams,
    _req: Request,
  ): Promise<User[]> {
    return this.#service.getAll(searchParams);
  }

  @generateHttpResponse()
  async create(
    _pathParams: PathParams,
    _searchParams: URLSearchParams,
    req: Request,
  ): Promise<User> {
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
  ): Promise<User> {
    return this.#service.updateById(
      pathParams.id,
      await req.json(),
    );
  }
}

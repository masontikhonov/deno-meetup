import { BaseController } from './base.controller.ts';
import { HttpMethod } from './const/http-method.const.ts';
import { log } from './deps.ts';
import { NotFoundError } from './errors/not-found.error.ts';

import type { HttpHandlersDict } from './types/http-handlers-dict.type.ts';

export class Router {
  #handlers: HttpHandlersDict = {
    GET: new Map(),
    POST: new Map(),
    PUT: new Map(),
    DELETE: new Map(),
    PATCH: new Map(),
  };

  constructor(...controllers: BaseController[]) {
    for (const controller of controllers) {
      for (const method in controller.handlers) {
        for (
          const [pattern, handler] of controller.handlers[<HttpMethod> method]!
        ) {
          this.#handlers[<HttpMethod> method].set(pattern, handler);
          log.info(
            `🔗 Route "${method} ${pattern.pathname}" registered for ${handler.originalName}`,
          );
        }
      }
    }
  }

  #throwNotFound(req: Request): never {
    throw new NotFoundError(`Not found: ${req.method} ${req.url}`);
  }

  #isSupportedMethod(method: string): method is HttpMethod {
    return HttpMethod.includes(<HttpMethod> method);
  }

  handleRequest(req: Request): Promise<Response> {
    if (!this.#isSupportedMethod(req.method)) {
      this.#throwNotFound(req);
    }

    for (const [pattern, handler] of this.#handlers[req.method]) {
      const match = pattern.exec(req.url);
      if (match) {
        const pathParams = { ...match.pathname.groups };
        const searchParams = new URLSearchParams(match.search.input);
        return handler(pathParams, searchParams, req);
      }
    }

    this.#throwNotFound(req);
  }
}

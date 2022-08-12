import type { HttpMethod } from './const/http-method.const.ts';
import type { HttpHandler } from './types/http-handler.type.ts';
import type { HttpHandlersDict } from './types/http-handlers-dict.type.ts';
import type { Path } from './types/path.type.ts';

type RegisterHandlers = Partial<Record<HttpMethod, Record<Path, HttpHandler>>>;

export abstract class BaseController {
  #handlers: Partial<HttpHandlersDict> = {};

  get handlers() {
    return this.#handlers;
  }

  #removeTrailingSlash(path: Path): Path {
    return path === '/' ? path : <Path> path.replace(/\/$/, '');
  }

  protected registerHandlers(data: RegisterHandlers): void {
    for (const method in data) {
      const routesMap = Object.entries(data[<HttpMethod> method]!).reduce(
        (map, [path, handler]) => {
          const boundHandler = handler.bind(this);
          boundHandler.originalName =
            `${this.constructor.name}.${handler.name}()`;
          return map.set(
            new URLPattern({
              pathname: this.#removeTrailingSlash(<Path> path),
            }),
            boundHandler,
          );
        },
        new Map<URLPattern, HttpHandler>(),
      );
      this.#handlers[<HttpMethod> method] = routesMap;
    }
  }
}

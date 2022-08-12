import {
  HTTP_STATUS_TEXT,
  httpServe,
  HttpServeInit,
  HttpStatus,
  log,
} from './deps.ts';
import { Router } from './router.ts';

export class App {
  #router: Router;
  #serverOptions: HttpServeInit;

  constructor(router: Router, serverOptions: HttpServeInit = {}) {
    this.#router = router;
    this.#serverOptions = serverOptions;
    this.#serverOptions.onListen ??= (params) => {
      const hostname = params.hostname === '0.0.0.0'
        ? 'localhost'
        : params.hostname;
      log.info(
        `🌍 Server is listening on http://${hostname}:${params.port}`,
      );
    };
    this.#serverOptions.onError ??= this.#defultErrorHandler.bind(this);
  }

  #defultErrorHandler(error: unknown): Response {
    log.error(error);
    return new Response(HTTP_STATUS_TEXT[HttpStatus.InternalServerError], {
      status: HttpStatus.InternalServerError,
      statusText: HTTP_STATUS_TEXT[HttpStatus.InternalServerError],
    });
  }

  public start() {
    httpServe(
      this.#router.handleRequest.bind(this.#router),
      this.#serverOptions,
    );
  }
}

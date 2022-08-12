import { HttpMethod } from '../const/http-method.const.ts';
import { HTTP_STATUS_TEXT, HttpStatus, HttpSuccessfulStatus } from '../deps.ts';

import type { BaseController } from '../base.controller.ts';
import type { HttpHandler } from '../types/http-handler.type.ts';
import type { PathParams } from '../types/path-params.type.ts';

/**
 * This decorator generates `Response` entity.
 *
 * Any returned value will be transformed to the JSON,
 * `['content-type', 'application/json']` header will be set.
 *
 * You can explicitly pass the HTTP status code for a successful response
 * as the first argument, or use the default settings.
 *
 * Default status code depends on request method: _GET: 200_ | _POST: 201_ |
 * _DELETE: 204_ | _Other: 200_
 *
 * @param status Http status code in case of success.
 */
export function generateHttpResponse(status?: HttpSuccessfulStatus) {
  return function (
    _target: BaseController,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<HttpHandler>,
  ) {
    const originalMethod = descriptor.value!;

    descriptor.value = async function (
      pathParams: PathParams,
      searchParams: URLSearchParams,
      req: Request,
    ): Promise<Response> {
      const responseData = await originalMethod.apply(this, [
        pathParams,
        searchParams,
        req,
      ]);

      switch (<HttpMethod> req.method) {
        case 'GET':
          status ??= HttpStatus.OK;
          break;
        case 'POST':
          status ??= HttpStatus.Created;
          break;
        case 'DELETE':
          status ??= HttpStatus.NoContent;
          break;
        default:
          status ??= HttpStatus.OK;
          break;
      }
      const statusText = HTTP_STATUS_TEXT[status];

      return new Response(JSON.stringify(responseData), {
        status,
        statusText,
        headers: [
          ['content-type', 'application/json'],
        ],
      });
    };

    Reflect.defineProperty(descriptor.value, 'name', {
      value: originalMethod.name,
      writable: false,
    });
  };
}

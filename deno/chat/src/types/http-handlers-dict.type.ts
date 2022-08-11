import type { HttpHandler } from './http-handler.type.ts';
import type { HttpMethod } from '../const/http-method.const.ts';

export type HttpHandlersDict = Record<HttpMethod, Map<URLPattern, HttpHandler>>;

/* 💡 Example:
  const pattern = new URLPattern({ pathname: '/users/:id' });
  pattern.test('https://admin:password@google.com/users/5?age=30#name');
  pattern.exec('https://admin:password@google.com/users/5?age=30#name');
*/

import type { PathParams } from './path-params.type.ts';

export interface HttpHandler {
  (
    pathParams: PathParams,
    searchParams: URLSearchParams,
    req: Request,
  ): Promise<any>;
  originalName?: string;
}

import { HTTP_STATUS_TEXT, HttpStatus } from '../deps.ts';
import { DbError } from '../errors/db.error.ts';
import { NotFoundError } from '../errors/not-found.error.ts';

export const handleErrors = (error: unknown): Response => {
  if (!(error instanceof Error)) {
    console.error(JSON.stringify(error));
    return new Response(null, {
      status: HttpStatus.InternalServerError,
      statusText: HTTP_STATUS_TEXT[HttpStatus.InternalServerError],
    });
  }

  if (error instanceof NotFoundError) {
    return new Response(error.message, {
      status: HttpStatus.NotFound,
      statusText: HTTP_STATUS_TEXT[HttpStatus.NotFound],
    });
  }

  console.error(error);

  if (error instanceof DbError) {
    return new Response(null, {
      status: HttpStatus.InternalServerError,
      statusText: HTTP_STATUS_TEXT[HttpStatus.InternalServerError],
    });
  }

  return new Response(null, {
    status: HttpStatus.InternalServerError,
    statusText: HTTP_STATUS_TEXT[HttpStatus.InternalServerError],
  });
};

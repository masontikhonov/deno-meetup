import { asserts, HTTP_STATUS_TEXT, HttpStatus } from '../deps.ts';
import { NotFoundError } from '../errors/not-found.error.ts';
import { handleErrors } from './handle-errors.ts';

Deno.test('handleErrors', async (t) => {
  await t.step(
    'should return valid Response if handled value is not an Error',
    () => {
      const error = '💥 Boom!';
      const actual = handleErrors(error);
      asserts.assertInstanceOf(actual, Response);
      asserts.assertEquals(actual.status, HttpStatus.InternalServerError);
      asserts.assertEquals(
        actual.statusText,
        HTTP_STATUS_TEXT[HttpStatus.InternalServerError],
      );
      asserts.assertEquals(actual.body, null);
    },
  );

  await t.step(
    'should return valid Response if error is NotFoundError',
    async () => {
      const error = new NotFoundError('Original message');
      const actual = handleErrors(error);
      asserts.assertInstanceOf(actual, Response);
      asserts.assertEquals(actual.status, HttpStatus.NotFound);
      asserts.assertEquals(
        actual.statusText,
        HTTP_STATUS_TEXT[HttpStatus.NotFound],
      );
      asserts.assertEquals(await actual.text(), error.message);
    },
  );
});

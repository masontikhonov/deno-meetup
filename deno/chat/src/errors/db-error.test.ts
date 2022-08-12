import { asserts, describe, it } from '../deps.ts';
import { DbError } from './db.error.ts';

describe('DbError', () => {
  it('should have propper name', () => {
    const error = new DbError('Test error');
    asserts.assertEquals(error.name, 'DbError');
  });
});

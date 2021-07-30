import { createUser } from '../src';
import { BankingError, Ok } from '../src/types';

describe('exbanking', () => {
  describe('METHOD: createUser', () => {
    it('should create the user', () => {
      expect(createUser('antonio')).toEqual<Ok>({ success: true });
    });
    it('should return UserAlreadyExists', () => {
      expect(createUser('antonio')).toEqual<BankingError>({
        name: 'UserAlreadyExists',
        message: 'The user with username antonio already exist',
      });
    });
  });
});

import { createUser } from '../src';
import { ErrorName } from '../src/error';
import { Ok, UserAlreadyExists } from '../src/types';

describe('exbanking', () => {
  describe('METHOD: createUser', () => {
    it('should create the user', () => {
      expect(createUser('antonio')).toEqual<Ok>({ success: true });
    });
    it('should create the user (Case sensitive)', () => {
      expect(createUser('Antonio')).toEqual<Ok>({ success: true });
    });
    it('should return UserAlreadyExists', () => {
      expect(createUser('antonio')).toEqual<UserAlreadyExists>({
        name: ErrorName.UserAlreadyExists,
        message: 'The user with username antonio already exist',
      });
    });
  });
});

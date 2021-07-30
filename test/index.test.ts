import { createUser, deposit, withdraw } from '../src';
import { resetDatabase } from '../src/database';
import { ErrorName } from '../src/error';
import {
  NotEnoughMoney,
  Ok,
  UserAlreadyExists,
  UserDoesNotExist,
} from '../src/types';

describe('exbanking', () => {
  beforeEach(() => {
    resetDatabase();
  });
  describe('METHOD: createUser', () => {
    it('should create the user', () => {
      const actual = createUser('antonio');
      const expected: Ok = { success: true };
      expect(actual).toEqual<Ok>(expected);
    });
    it('should create the user (Case sensitive)', () => {
      createUser('antonio');
      const actual = createUser('Antonio');
      const expected: Ok = { success: true };
      expect(actual).toEqual<Ok>(expected);
    });
    it('should return UserAlreadyExists', () => {
      createUser('antonio');
      const actual = createUser('antonio');
      const expected: UserAlreadyExists = {
        name: ErrorName.UserAlreadyExists,
        message: 'The user with username antonio already exist',
      };
      expect(actual).toEqual<UserAlreadyExists>(expected);
    });
  });
  describe('METHOD: deposit', () => {
    it('should return UserDoesNotExist', () => {
      const actual = deposit('antonio', 50, 'USD');
      const expected: UserDoesNotExist = {
        name: ErrorName.UserDoesNotExist,
        message: 'The user with username antonio does not exist',
      };
      expect(actual).toEqual<UserDoesNotExist>(expected);
    });
    it('should deposit 50 USD into antonio balance, and get a balance of 50', () => {
      createUser('antonio');
      const actual = deposit('antonio', 50, 'USD');
      const expected: Ok & { newBalance: number } = {
        success: true,
        newBalance: 50,
      };
      expect(actual).toEqual<Ok & { newBalance: number }>(expected);
    });
    it('should deposit 50 USD into antonio balance twice and get a final ballance of 100', () => {
      createUser('antonio');
      deposit('antonio', 50, 'USD');
      const actual = deposit('antonio', 50, 'USD');
      const expected: Ok & { newBalance: number } = {
        success: true,
        newBalance: 100,
      };
      expect(actual).toEqual<Ok & { newBalance: number }>(expected);
    });
  });
  describe('METHOD: withdraw', () => {
    it('should return UserDoesNotExist', () => {
      const actual = withdraw('antonio', 50, 'USD');
      const expected: UserDoesNotExist = {
        name: ErrorName.UserDoesNotExist,
        message: 'The user with username antonio does not exist',
      };
      expect(actual).toEqual<UserDoesNotExist>(expected);
    });
    it('should return NotEnoughMoney for a user with no balance', () => {
      createUser('antonio');
      const actual = withdraw('antonio', 50, 'USD');
      const expected: NotEnoughMoney = {
        name: ErrorName.NotEnoughMoney,
        message: `There isn't enough money in the user balance`,
      };
      expect(actual).toEqual<NotEnoughMoney>(expected);
    });
    it('should return NotEnoughMoney for a user with insuficient funds', () => {
      createUser('antonio');
      deposit('antonio', 10, 'USD');
      const actual = withdraw('antonio', 50, 'USD');
      const expected: NotEnoughMoney = {
        name: ErrorName.NotEnoughMoney,
        message: `There isn't enough money in the user balance`,
      };
      expect(actual).toEqual<NotEnoughMoney>(expected);
    });
    it('should withdraw 50 USD from antonio balance, and get a balance of 0', () => {
      createUser('antonio');
      deposit('antonio', 50, 'USD');
      const actual = withdraw('antonio', 50, 'USD');
      const expected: Ok & { newBalance: number } = {
        success: true,
        newBalance: 0,
      };
      expect(actual).toEqual<Ok & { newBalance: number }>(expected);
    });
  });
});

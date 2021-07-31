import { createUser, deposit, getBalance, send, withdraw } from '../src';
import { resetDatabase } from '../src/database';
import { ErrorName } from '../src/error';
import {
  NotEnoughMoney,
  Ok,
  ReceiverDoesNotExist,
  SenderDoesNotExist,
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
    it('should deposit 50.99 USD into antonio balance, and get a balance of 50.99', () => {
      createUser('antonio');
      const actual = deposit('antonio', 50.99, 'USD');
      const expected: Ok & { newBalance: number } = {
        success: true,
        newBalance: 50.99,
      };
      expect(actual).toEqual<Ok & { newBalance: number }>(expected);
    });
    it('should deposit 50.001 USD into antonio balance, and get a balance of 50', () => {
      createUser('antonio');
      const actual = deposit('antonio', 50.001, 'USD');
      const expected: Ok & { newBalance: number } = {
        success: true,
        newBalance: 50,
      };
      expect(actual).toEqual<Ok & { newBalance: number }>(expected);
    });
    it('should deposit 50 into antonio USD and usd balances (Case sensitive)', () => {
      createUser('antonio');
      deposit('antonio', 50, 'USD');
      const actual = deposit('antonio', 50, 'usd');
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
    it('should withdraw 50.99 USD from antonio balance, and get a balance of 0', () => {
      createUser('antonio');
      deposit('antonio', 50.99, 'USD');
      const actual = withdraw('antonio', 50.99, 'USD');
      const expected: Ok & { newBalance: number } = {
        success: true,
        newBalance: 0,
      };
      expect(actual).toEqual<Ok & { newBalance: number }>(expected);
    });
    it('should withdraw 50 USD from antonio balance when calling with 50.001', () => {
      createUser('antonio');
      deposit('antonio', 50.001, 'USD');
      const actual = withdraw('antonio', 50.001, 'USD');
      const expected: Ok & { newBalance: number } = {
        success: true,
        newBalance: 0,
      };
      expect(actual).toEqual<Ok & { newBalance: number }>(expected);
    });
  });
  describe('METHOD: getBalance', () => {
    it('should return UserDoesNotExist', () => {
      const actual = getBalance('antonio', 'USD');
      const expected: UserDoesNotExist = {
        name: ErrorName.UserDoesNotExist,
        message: 'The user with username antonio does not exist',
      };
      expect(actual).toEqual<UserDoesNotExist>(expected);
    });
    it('should return the balance of 0', () => {
      createUser('antonio');
      const actual = getBalance('antonio', 'USD');
      const expected: Ok & { balance: number } = {
        success: true,
        balance: 0,
      };
      expect(actual).toEqual<Ok & { balance: number }>(expected);
    });
    it('should return the balance of the user', () => {
      createUser('antonio');
      deposit('antonio', 50, 'USD');
      const actual = getBalance('antonio', 'USD');
      const expected: Ok & { balance: number } = {
        success: true,
        balance: 50,
      };
      expect(actual).toEqual<Ok & { balance: number }>(expected);
    });
    it('should return the balance of the user', () => {
      createUser('antonio');
      deposit('antonio', 50.001, 'USD');
      const actual = getBalance('antonio', 'USD');
      const expected: Ok & { balance: number } = {
        success: true,
        balance: 50,
      };
      expect(actual).toEqual<Ok & { balance: number }>(expected);
    });
  });
  describe('METHOD: send', () => {
    it('should return SenderDoesNotExist', () => {
      const actual = send('antonio', 'livia', 50, 'USD');
      const expected: SenderDoesNotExist = {
        name: ErrorName.SenderDoesNotExist,
        message: 'The user with username antonio does not exist',
      };
      expect(actual).toEqual<SenderDoesNotExist>(expected);
    });
    it('should return ReceiverDoesNotExist', () => {
      createUser('antonio');
      const actual = send('antonio', 'livia', 50, 'USD');
      const expected: ReceiverDoesNotExist = {
        name: ErrorName.ReceiverDoesNotExist,
        message: 'The user with username livia does not exist',
      };
      expect(actual).toEqual<ReceiverDoesNotExist>(expected);
    });
    it('should return NotEnoughMoney for a user with no balance', () => {
      createUser('antonio');
      createUser('livia');
      const actual = send('antonio', 'livia', 50, 'USD');
      const expected: NotEnoughMoney = {
        name: ErrorName.NotEnoughMoney,
        message: `There isn't enough money in the user balance`,
      };
      expect(actual).toEqual<NotEnoughMoney>(expected);
    });
    it('should return NotEnoughMoney for a user with insuficient funds', () => {
      createUser('antonio');
      createUser('livia');
      deposit('antonio', 10, 'USD');
      const actual = send('antonio', 'livia', 50, 'USD');
      const expected: NotEnoughMoney = {
        name: ErrorName.NotEnoughMoney,
        message: `There isn't enough money in the user balance`,
      };
      expect(actual).toEqual<NotEnoughMoney>(expected);
    });
    it('should send 50 USD from antonio to livia, giving a final balance of 0 and 50 respectivly', () => {
      createUser('antonio');
      createUser('livia');
      deposit('antonio', 50, 'USD');
      const actual = send('antonio', 'livia', 50, 'USD');
      const expected: Ok & {
        fromUsernameBalance: number;
        toUsernameBalance: number;
      } = {
        success: true,
        fromUsernameBalance: 0,
        toUsernameBalance: 50,
      };
      expect(actual).toEqual<
        Ok & { fromUsernameBalance: number; toUsernameBalance: number }
      >(expected);
    });
    it('should send 50 USD from antonio to livia, giving a final balance of 0 and 100 respectivly', () => {
      createUser('antonio');
      createUser('livia');
      deposit('antonio', 50, 'USD');
      deposit('livia', 50, 'USD');
      const actual = send('antonio', 'livia', 50, 'USD');
      const expected: Ok & {
        fromUsernameBalance: number;
        toUsernameBalance: number;
      } = {
        success: true,
        fromUsernameBalance: 0,
        toUsernameBalance: 100,
      };
      expect(actual).toEqual<
        Ok & { fromUsernameBalance: number; toUsernameBalance: number }
      >(expected);
    });
    it('should send 50 USD from antonio to livia when calling with 50.001, giving a final balance of 0 and 100 respectivly', () => {
      createUser('antonio');
      createUser('livia');
      deposit('antonio', 50, 'USD');
      deposit('livia', 50, 'USD');
      const actual = send('antonio', 'livia', 50.001, 'USD');
      const expected: Ok & {
        fromUsernameBalance: number;
        toUsernameBalance: number;
      } = {
        success: true,
        fromUsernameBalance: 0,
        toUsernameBalance: 100,
      };
      expect(actual).toEqual<
        Ok & { fromUsernameBalance: number; toUsernameBalance: number }
      >(expected);
    });
  });
});

import { Balance, getBalance, getUser, User, users } from './database';
import {
  notEnoughMoneyError,
  userAlreadyExistsError,
  userDoesNotExistError,
} from './error';
import { BankingError, Ok } from './types';

/**
 * Creates a new user
 * @param username The username of the new user
 * @returns Ok if it succeeds or a BankingError if not
 */
export const createUser = (username: string): Ok | BankingError => {
  if (getUser(username)) {
    return userAlreadyExistsError(
      `The user with username ${username} already exist`
    );
  }
  users.push(new User(username));
  return { success: true };
};

/**
 * Deposits a specific amount into a specific user's balance
 * @param username The username of the user we want to do a deposit
 * @param amount The amount we want to deposit
 * @param currency The respective currency of the amount
 * @returns Ok and the newBalance if it succeeds or a BankingError if not
 */
export const deposit = (
  username: string,
  amount: number,
  currency: string
): (Ok & { newBalance: number }) | BankingError => {
  const user = getUser(username);
  if (user) {
    const balance = getBalance(user, currency);
    if (balance) {
      balance.amount += amount;
      return { success: true, newBalance: balance.amount };
    } else {
      user.balances.push(new Balance(currency, amount));
      return { success: true, newBalance: amount };
    }
  } else {
    return userDoesNotExistError(
      `The user with username ${username} does not exist`
    );
  }
};

/**
 * Withdraws a specific amount from a specific user's balance
 * @param username The username of the user we want to do a withdraw
 * @param amount The amount we want to withdraw
 * @param currency The respective currency of the amount
 * @returns Ok and the newBalance if it succeeds or a BankingError if not
 */
export const withdraw = (
  username: string,
  amount: number,
  currency: string
): (Ok & { newBalance: number }) | BankingError => {
  const user = getUser(username);
  if (user) {
    const balance = getBalance(user, currency);
    if (balance && balance.amount >= amount) {
      balance.amount -= amount;
      return { success: true, newBalance: balance.amount };
    } else {
      return notEnoughMoneyError(
        `There isn't enough money in the user balance`
      );
    }
  } else {
    return userDoesNotExistError(
      `The user with username ${username} does not exist`
    );
  }
};

// /**
//  * Get the balance of a specific currency from a user
//  * @param username The username of the user we want to get the balance
//  * @param currency The currency of the balance we want to get
//  * @returns Ok and the balance if it succeeds or a BankingError if not
//  */
// const getBalance = (
//   username: string,
//   currency: string
// ): (Ok & { balance: number }) | BankingError => {
//   throw new Error('Method not implemented.');
// };

// /**
//  * Send an amount of a specific currency from a user to another
//  * @param fromUsername The username of the user we want to send the amount from
//  * @param toUsername The username of the user we want to send the amount to
//  * @param amount The amount we want to send
//  * @param currency The respective currency of the amount
//  * @returns Ok, fromUsernameBalance and toUsernameBalance if it succeeds or a BankingError if not
//  */
// const send = (
//   fromUsername: string,
//   toUsername: string,
//   amount: number,
//   currency: string
// ):
//   | (Ok & { fromUsernameBalance: number; toUsernameBalance: number })
//   | BankingError => {
//   throw new Error('Method not implemented.');
// };

import { add, roundTo, subtract } from '../currency';
import {
  updateBalance,
  insertAccount,
  insertAccountBalance,
  getAccount,
  getAccountBalance,
} from '../database';
import {
  notEnoughMoneyError,
  receiverDoesNotExistError,
  senderDoesNotExistError,
  userAlreadyExistsError,
  userDoesNotExistError,
} from '../error';
import { BankingError, Ok } from '../types';

export class AccountService {
  static createAccount(username: string): Ok | BankingError {
    if (getAccount(username)) {
      return userAlreadyExistsError(
        `The user with username ${username} already exist`
      );
    }
    insertAccount(username);
    return { success: true };
  }

  static deposit(
    username: string,
    amount: number,
    currency: string
  ): (Ok & { newBalance: number }) | BankingError {
    amount = roundTo(amount, 2);
    const account = getAccount(username);
    if (account) {
      const balance = getAccountBalance(account, currency);
      if (balance) {
        updateBalance(balance, add(balance.amount, amount));
        return { success: true, newBalance: balance.amount };
      } else {
        insertAccountBalance(account, currency, amount);
        return { success: true, newBalance: amount };
      }
    } else {
      return userDoesNotExistError(
        `The user with username ${username} does not exist`
      );
    }
  }

  static withdraw(
    username: string,
    amount: number,
    currency: string
  ): (Ok & { newBalance: number }) | BankingError {
    amount = roundTo(amount, 2);
    const account = getAccount(username);
    if (account) {
      const balance = getAccountBalance(account, currency);
      if (balance && balance.amount >= amount) {
        updateBalance(balance, subtract(balance.amount, amount));
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
  }

  static getBalance(
    username: string,
    currency: string
  ): (Ok & { balance: number }) | BankingError {
    const account = getAccount(username);
    if (account) {
      const balance = getAccountBalance(account, currency);
      if (balance) {
        return { success: true, balance: balance.amount };
      } else {
        return { success: true, balance: 0 };
      }
    } else {
      return userDoesNotExistError(
        `The user with username ${username} does not exist`
      );
    }
  }

  static send(
    fromUsername: string,
    toUsername: string,
    amount: number,
    currency: string
  ):
    | (Ok & { fromUsernameBalance: number; toUsernameBalance: number })
    | BankingError {
    amount = roundTo(amount, 2);
    const fromAccount = getAccount(fromUsername);
    const toAccount = getAccount(toUsername);
    if (fromAccount) {
      if (toAccount) {
        // Withdraw fromUser
        const fromUserBalance = getAccountBalance(fromAccount, currency);
        if (fromUserBalance && fromUserBalance.amount >= amount) {
          updateBalance(
            fromUserBalance,
            subtract(fromUserBalance.amount, amount)
          );

          // Deposit toUser
          const toUserBalance = getAccountBalance(toAccount, currency);
          if (toUserBalance) {
            updateBalance(toUserBalance, add(toUserBalance.amount, amount));

            return {
              success: true,
              fromUsernameBalance: fromUserBalance.amount,
              toUsernameBalance: toUserBalance.amount,
            };
          } else {
            insertAccountBalance(toAccount, currency, amount);
            return {
              success: true,
              fromUsernameBalance: fromUserBalance.amount,
              toUsernameBalance: amount,
            };
          }
        } else {
          return notEnoughMoneyError(
            `There isn't enough money in the user balance`
          );
        }
      } else {
        return receiverDoesNotExistError(
          `The user with username ${toUsername} does not exist`
        );
      }
    } else {
      return senderDoesNotExistError(
        `The user with username ${fromUsername} does not exist`
      );
    }
  }
}

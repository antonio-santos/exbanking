import { Balance, Account } from './models/account';

let accounts: Account[] = [];

export const resetDatabase = () => {
  accounts = [];
};

export const insertAccount = (username: string) => {
  accounts.push(new Account(username));
};

export const getAccount = (username: string): Account | undefined => {
  return accounts.find(element => element.username === username);
};

export const insertAccountBalance = (
  account: Account,
  currency: string,
  amount: number
) => {
  account.balances.push(new Balance(currency, amount));
};

export const getAccountBalance = (
  account: Account,
  currency: string
): Balance | undefined => {
  return account.balances.find(element => element.currency === currency);
};

export const updateBalance = (balance: Balance, newAmount: number) => {
  balance.amount = newAmount;
};

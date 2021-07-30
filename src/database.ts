export class Balance {
  currency: string;
  amount: number;

  constructor(currency: string, amount: number) {
    this.currency = currency;
    this.amount = amount;
  }
}

export class User {
  username: string;
  balances: Balance[];

  constructor(username: string) {
    this.username = username;
    this.balances = [];
  }
}

export let users: User[] = [];

export const getUser = (username: string): User | undefined => {
  if (users.length > 0) {
    return users.find(element => element.username === username);
  } else {
    return undefined;
  }
};

// TODO Do we need this get?
export const getUserBalance = (
  user: User,
  currency: string
): Balance | undefined => {
  if (user.balances.length > 0) {
    return user.balances.find(element => element.currency === currency);
  } else {
    return undefined;
  }
};

export const resetDatabase = () => {
  users = [];
};

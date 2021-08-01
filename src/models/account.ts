export class Balance {
  currency: string;
  amount: number;

  constructor(currency: string, amount: number) {
    this.currency = currency;
    this.amount = amount;
  }
}

export class Account {
  username: string;
  balances: Balance[];

  constructor(username: string) {
    this.username = username;
    this.balances = [];
  }
}

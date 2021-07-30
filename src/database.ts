export class User {
  username: string;
  balance: { currency: string; amount: number }[];

  constructor(username: string) {
    this.username = username;
    this.balance = [];
  }
}

export const users: User[] = [];

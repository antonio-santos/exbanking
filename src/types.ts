type WrongArguments = {};
type UserAlreadyExists = {};
type UserDoesNotExist = {};
type NotEnoughMoney = {};
type SenderDoesNotExist = {};
type ReceiverDoesNotExist = {};

export type BankingError =
  | Error
  | WrongArguments
  | UserAlreadyExists
  | UserDoesNotExist
  | NotEnoughMoney
  | SenderDoesNotExist
  | ReceiverDoesNotExist;

export type Ok = { success: true };


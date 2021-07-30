import { ErrorName } from './error';

export type WrongArguments = { name: ErrorName; message: string };
export type UserAlreadyExists = { name: ErrorName; message: string };
export type UserDoesNotExist = { name: ErrorName; message: string };
export type NotEnoughMoney = { name: ErrorName; message: string };
export type SenderDoesNotExist = { name: ErrorName; message: string };
export type ReceiverDoesNotExist = { name: ErrorName; message: string };

export type BankingError =
  | Error
  | WrongArguments
  | UserAlreadyExists
  | UserDoesNotExist
  | NotEnoughMoney
  | SenderDoesNotExist
  | ReceiverDoesNotExist;

export type Ok = { success: true };

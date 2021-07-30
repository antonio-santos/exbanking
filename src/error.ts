import { UserAlreadyExists } from './types';

export enum ErrorName {
  WrongArguments,
  UserAlreadyExists,
  UserDoesNotExist,
  NotEnoughMoney,
  SenderDoesNotExist,
  ReceiverDoesNotExist,
}

export const createUserAlreadyExistsError = (message: string): UserAlreadyExists => {
  return {
    name: ErrorName.UserAlreadyExists,
    message: message,
  } as UserAlreadyExists;
};

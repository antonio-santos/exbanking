import { UserAlreadyExists, UserDoesNotExist } from './types';

export enum ErrorName {
  WrongArguments,
  UserAlreadyExists,
  UserDoesNotExist,
  NotEnoughMoney,
  SenderDoesNotExist,
  ReceiverDoesNotExist,
}

export const userAlreadyExistsError = (message?: string): UserAlreadyExists => {
  return {
    name: ErrorName.UserAlreadyExists,
    message: message || 'The user already exist',
  } as UserAlreadyExists;
};

export const userDoesNotExistError = (message: string): UserDoesNotExist => {
  return {
    name: ErrorName.UserDoesNotExist,
    message: message,
  } as UserDoesNotExist;
};

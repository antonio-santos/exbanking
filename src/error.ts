import {
  NotEnoughMoney,
  ReceiverDoesNotExist,
  SenderDoesNotExist,
  UserAlreadyExists,
  UserDoesNotExist,
} from './types';

export enum ErrorName {
  WrongArguments, // TODO Use this?
  UserAlreadyExistsError,
  UserDoesNotExistError,
  NotEnoughMoneyError,
  SenderDoesNotExistError,
  ReceiverDoesNotExistError,
}

export const userAlreadyExistsError = (message: string): UserAlreadyExists => {
  return {
    name: ErrorName.UserAlreadyExistsError,
    message: message,
  } as UserAlreadyExists;
};

export const userDoesNotExistError = (message: string): UserDoesNotExist => {
  return {
    name: ErrorName.UserDoesNotExistError,
    message: message,
  } as UserDoesNotExist;
};

export const notEnoughMoneyError = (message: string): NotEnoughMoney => {
  return {
    name: ErrorName.NotEnoughMoneyError,
    message: message,
  } as NotEnoughMoney;
};

export const senderDoesNotExistError = (
  message: string
): SenderDoesNotExist => {
  return {
    name: ErrorName.SenderDoesNotExistError,
    message: message,
  } as SenderDoesNotExist;
};

export const receiverDoesNotExistError = (
  message: string
): ReceiverDoesNotExist => {
  return {
    name: ErrorName.ReceiverDoesNotExistError,
    message: message,
  } as ReceiverDoesNotExist;
};

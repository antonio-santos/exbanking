import {
  NotEnoughMoney,
  ReceiverDoesNotExist,
  SenderDoesNotExist,
  UserAlreadyExists,
  UserDoesNotExist,
} from './types';

export enum ErrorName {
  WrongArguments, // TODO Use this
  UserAlreadyExists, // TODO Fix this warning
  UserDoesNotExist,
  NotEnoughMoney,
  SenderDoesNotExist,
  ReceiverDoesNotExist,
}

export const userAlreadyExistsError = (message: string): UserAlreadyExists => {
  return {
    name: ErrorName.UserAlreadyExists,
    message: message,
  } as UserAlreadyExists;
};

export const userDoesNotExistError = (message: string): UserDoesNotExist => {
  return {
    name: ErrorName.UserDoesNotExist,
    message: message,
  } as UserDoesNotExist;
};

export const notEnoughMoneyError = (message: string): NotEnoughMoney => {
  return {
    name: ErrorName.NotEnoughMoney,
    message: message,
  } as NotEnoughMoney;
};

export const senderDoesNotExistError = (
  message: string
): SenderDoesNotExist => {
  return {
    name: ErrorName.SenderDoesNotExist,
    message: message,
  } as SenderDoesNotExist;
};

export const receiverDoesNotExistError = (
  message: string
): ReceiverDoesNotExist => {
  return {
    name: ErrorName.ReceiverDoesNotExist,
    message: message,
  } as ReceiverDoesNotExist;
};

type WrongArguments = {};
type UserAlreadyExists = {};
type UserDoesNotExist = {};
type NotEnoughMoney = {};
type SenderDoesNotExist = {};
type ReceiverDoesNotExist = {};

type BankingError =
  | Error
  | WrongArguments
  | UserAlreadyExists
  | UserDoesNotExist
  | NotEnoughMoney
  | SenderDoesNotExist
  | ReceiverDoesNotExist;

type Ok = { success: true };


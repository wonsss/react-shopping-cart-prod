import { ERROR, MESSAGE } from './constants';
import CustomError from './CustomError';

type UserType = {
  id: string;
  email: string;
  nickname: string;
  password: string;
};

export const validateEmail = (email: string): void => {
  if (!email.includes('@') || !email.includes('.', email.indexOf('@'))) {
    throw new CustomError(2101, MESSAGE.INVALID_EMAIL_FORMAT);
  }

  if (email.length !== email.trim().length) {
    throw new CustomError(2101, MESSAGE.INVALID_EMAIL_BLANK);
  }
};

export const validatePassword = (password: string): void => {
  const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;

  if (!passwordRule.test(password)) {
    throw new CustomError(2103, MESSAGE.INVALID_PASSWORD_FORMAT, 400);
  }
};

export const validateNickname = (nickname: string): void => {
  if (nickname.length < 2 || nickname.length > 10) {
    throw new CustomError(2102, MESSAGE.INVALID_NICKNAME_FORMAT);
  }
};

export const checkPasswordSame = (users: UserType[], userId: string, password: string): void => {
  if (users.find(user => user.id === userId).password !== password) {
    throw new CustomError(2201, ERROR[2201]);
  }
};

export const checkDuplicatedEmail = (users: UserType[], email: string): void => {
  if (users.some(user => user.email === email)) {
    throw new CustomError(2001, ERROR[2001]);
  }
};

export const validateToken = (users: UserType[], accessToken: { id: string }): void => {
  if (!users.some(user => user.id === accessToken.id)) {
    throw new CustomError(1003, ERROR[1003]);
  }
};

export const checkUserPassword = (user: UserType, password: string): void => {
  if (user.password !== password) {
    throw new CustomError(2201, ERROR[2201]);
  }
};

export const checkEmailExist = (users: UserType[], email: string): void => {
  if (!users.find(user => user.email === email)) {
    throw new CustomError(2201, ERROR[2201]);
  }
};

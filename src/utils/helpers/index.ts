import { compareSync, hashSync } from 'bcryptjs';
import { CNPJ, CPF } from '~/utils';

export const isValidPassword = (password?: string, confirm_password?: string): boolean => {
  return password === confirm_password;
};

export const encryptPassword = (password: string): string => {
  return hashSync(password, 8);
};

export const decryptPassword = (password: string, passwordCompare: string): boolean => {
  if (compareSync(password, passwordCompare)) {
    return true;
  }

  return false;
};

export const isValidDocument = (document: string): boolean => {
  if (CPF.isValid(document) || CNPJ.isValid(document)) {
    return true;
  }

  return false;
};

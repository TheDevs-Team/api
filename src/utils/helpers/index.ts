import { hashSync } from 'bcryptjs';
import { CNPJ, CPF } from '../modules';

export const isValidPassword = (password: string, confirm_password: string): boolean => {
  return password === confirm_password;
};

export const encryptPassword = (password: string): string => {
  return hashSync(password, 8);
};

export const isValidDocument = (document: string): boolean => {
  if (CPF.isValid(document) || CNPJ.isValid(document)) {
    return true;
  }

  return false;
};

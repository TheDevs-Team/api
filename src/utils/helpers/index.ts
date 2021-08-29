import { compareSync, hashSync } from 'bcryptjs';
import { CNPJ, CPF } from '~/utils';
import jwt from 'jsonwebtoken';
import { secret } from '~/config';

export const isValidPassword = (password?: string, confirm_password?: string): boolean => {
  return password === confirm_password;
};

export const encryptPassword = (password: string): string => {
  return hashSync(password, 8);
};

export const decryptPassword = (password: string, passwordCompare: string): boolean => {
  return compareSync(password, passwordCompare);
};

export const isValidDocument = (document: string): boolean => {
  return CPF.isValid(document) || CNPJ.isValid(document);
};

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, secret.key, {
    expiresIn: '30d',
  });
};

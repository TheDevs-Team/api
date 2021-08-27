export const isValidPassword = (password: string, confirm_password: string): boolean => {
  return password === confirm_password;
};

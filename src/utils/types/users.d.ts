declare type CreateUserType = {
  name: string;
  document: string;
  email: string;
  phone: string;
  type: string;
  financial_status: string;
  password: string;
  confirm_password: string;
};

declare type UpdateUserType = {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  type: string;
  financial_status: string;
  password: string;
  confirm_password: string;
};

declare type UserType = {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  type: string;
  financial_status: string;
  password: string;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
};

declare type FindUserType = {
  id: string;
  email: string;
  document: string;
};

declare type DisableUserType = {
  id: string;
  active: boolean;
};

declare type UserLoginType = {
  email: string;
  password: string;
};

declare type CreateTemporaryUserType = {
  name: string;
  document: string;
  email: string;
  phone: string;
  type: string;
  financial_status: string;
};

declare type UpdateTemporaryUserType = {
  id: string;
  password: string;
  confirm_password: string;
};

declare type TemporaryUserType = {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  type: string;
  financial_status: string;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
};

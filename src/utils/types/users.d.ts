declare type CreateUserType = {
  name: string;
  document: string;
  email: string;
  phone: string;
  type: string;
  password: string;
};

declare type UserType = {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  type: string;
  password: string;
  active: boolean;
  created_at?: Date;
  updated_at?: Date;
};

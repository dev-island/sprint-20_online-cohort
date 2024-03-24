export type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormData = {
  username: string;
  password: string;
};

export type User = {
  _id: string;
  username: string;
};
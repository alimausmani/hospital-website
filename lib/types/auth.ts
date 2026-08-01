export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignupInput = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordInput = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type ProfileInput = {
  name: string;
  email: string;
  phone: string;
};

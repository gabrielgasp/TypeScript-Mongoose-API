export interface IUser {
  email: string;
  name: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ITokenData {
  email: string;
  name: string;
}

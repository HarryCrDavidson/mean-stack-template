export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  role: string;
}

export interface UserApiResponse {
  _id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  token: string;
}

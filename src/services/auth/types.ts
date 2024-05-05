import { User } from "@/types/access";
export interface Tokens {
  access_token: string;
  refresh_token: string;
}
export interface UserInfo {
  data: User | null;
  tokens: Tokens | null;
  message?: string;
}
export interface ResponseUser {
  data: UserInfo;
}

export interface IBodyLogin {
  email: string;
  password: string;
}

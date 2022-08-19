import { DisplayUser } from "./DisplayUser.interface";

export interface Decodejwt {
  user: DisplayUser;
  exp: number;
  iat: number;
}

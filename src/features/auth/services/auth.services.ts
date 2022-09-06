import axios from "axios";
import jwtDecode from "jwt-decode";
import { Decodejwt } from "../models/Decodejwt.interface";
import { DisplayUser } from "../models/DisplayUser.interface";
import { Jwt } from "../models/jwt";
import { LoginUser } from "../models/LoginUser.interface";
import { NewUser } from "../models/NewUser";

export const register = async (user: NewUser): Promise<DisplayUser | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/register`,
    user
  );

  return response.data;
};

export const login = async (user: LoginUser): Promise<Jwt> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/login`,
    user
  );
  if (response.data) {
    localStorage.setItem("jwt", JSON.stringify(response.data));
    const decodeJwt: Decodejwt = jwtDecode(response.data.token);
    localStorage.setItem("user", JSON.stringify(decodeJwt));
  }
  return response.data;
};

const logout = (): void => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/verfiy-jwt`,
    { jwt }
  );

  if (response.data) {
    const jwtExpierMs = response.data.exp * 1000;
    return jwtExpierMs > Date.now();
  }
  return false;
};
const authServices = {
  register,
  login,
  logout,
  verifyJwt,
};

export default authServices;

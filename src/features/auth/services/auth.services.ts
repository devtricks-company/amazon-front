import axios from "axios";
import { DisplayUser } from "../models/displayuser.interface";
import { NewUser } from "../models/NewUser";

export const register = async (user: NewUser): Promise<DisplayUser | null> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/register`,
    user
  );

  return response.data;
};

const authServices = {
  register,
};

export default authServices;

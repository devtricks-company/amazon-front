import { RegisterFormField } from "./registerFormFiled.interface";

export type NewUser = Omit<RegisterFormField, "confirmPassword">;

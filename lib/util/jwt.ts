import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/constants";

export const isValidToken = (token: string): boolean => {
  if (!JWT_SECRET) return false;
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

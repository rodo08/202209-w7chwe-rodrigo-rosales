import type { JwtPayload } from "jsonwebtoken";

export interface Username {
  username: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends UserCredentials {
  username: string;
  password: string;
  email: string;
}

export interface UserTokenPayload extends JwtPayload {
  id: string;
  username: string;
}

export interface CustomRequest extends Request {
  userId: string;
}

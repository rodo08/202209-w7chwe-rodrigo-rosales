import "../../../loadEnvironment.js";
import jwt from "jsonwebtoken";
import type { Response, Request, NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import User from "../../../database/models/Users.js";
import type {
  UserCredentials,
  UserTokenPayload,
} from "../../../types/types.js";
import bcrypt from "bcryptjs";
import environment from "../../../loadEnvironment.js";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as UserCredentials;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new CustomError(
      "Wrong Credentials",
      401,
      "Wrong Credentials"
    );
    next(error);
    return;
  }

  const tokenPayload: UserTokenPayload = {
    id: user._id.toString(),
    username,
  };

  const token = jwt.sign(tokenPayload, environment.secretWord, {
    expiresIn: "2d",
  });

  res.status(200).json({ token });
};

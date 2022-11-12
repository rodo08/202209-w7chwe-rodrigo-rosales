import type { Response, Request, NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError";
import User from "../../../database/models/Users";
import type { UserCredencials } from "../../../types/types";
import bcrypt from "bcryptjs";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as UserCredencials;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new CustomError(
      "Wrong Credentials",
      401,
      "Wrong Credentials"
    );
    next(error);
  }
};

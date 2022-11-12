import type { NextFunction, Request, Response } from "express";
import type CustomError from "../../CustomError/CustomError.js";

export const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).json({ message: "unknown endpoint" });
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message =
    error.publicMessage || "something went wrong, please try again later";
  res.status(statusCode).json({ error: message });
};

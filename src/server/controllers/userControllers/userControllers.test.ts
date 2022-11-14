import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";
import User from "../../../database/models/Users";
import { loginUser } from "./userControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

const userTest = {
  username: "rodrigo",
  password: "1234",
};

const token = jwt.sign({}, "test");

describe("Given a controller 'userController'", () => {
  describe("And its userLogin controller is invoked", () => {
    describe("When it receives a request with the username 'rodrigo' and '1234' as a password and a response", () => {
      test("Then it should call a 200 response status and token", async () => {
        const user = {
          username: "rodrigo",
          password: "1234",
          _id: new mongoose.Types.ObjectId(),
        };
        const expectedStatus = 200;
        req.body = user;

        User.findOne = jest.fn().mockResolvedValueOnce(user);
        bcrypt.compare = jest.fn().mockResolvedValueOnce(true);
        jwt.sign = jest.fn().mockReturnValueOnce(token);

        await loginUser(req as Request, res as Response, next as NextFunction);

        expect(res.status).toHaveBeenCalledWith(expectedStatus);
        expect(res.json).toBeCalledWith({ token });
      });
    });
  });
});

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";
import User from "../../../database/models/Users";
import { loginUser, registerUser } from "./userControllers.js";
import loginError from "../../../CustomError/types";
import type { RegisterData } from "../../../types/types";

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

    describe("When it receives a request with the username 'rodrigo' and password '1234' and a next function", () => {
      test("Then it should call next with a CustomError with publicMessage 'Wrong credentials'", async () => {
        userTest.username = "notrodrigo";
        req.body = userTest;

        User.findOne = jest.fn().mockResolvedValueOnce(null);
        await loginUser(req as Request, res as Response, next as NextFunction);

        expect(next).toHaveBeenCalledWith(loginError.userNotFound);
      });
    });
  });
});

describe("Given a controller 'registerUser'", () => {
  describe("When it receives a request with the username 'rodo', the password '1234' and the email 'ro@do.com'", () => {
    test("Then a status 201 should be received along the new user's data", async () => {
      const expectedStatus = 201;
      const registerUserData: RegisterData = {
        username: "rodo",
        password: "1234",
        email: "ro@do.com",
      };

      const req: Partial<Request> = {
        body: registerUserData,
      };

      const userId = new mongoose.Types.ObjectId();

      bcrypt.hash = jest.fn().mockResolvedValue(registerUserData.password);
      User.create = jest.fn().mockResolvedValue({
        ...registerUserData,
        _id: userId,
      });

      const expectedMessage = {
        message: "User rodo created",
      };

      await registerUser(req as Request, res as Response, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });

    describe("When it receives a request with the username 'rodrigo', password '1234' and email 'rod@drigo.com' which ara already in the database", () => {
      test("Then it should call the next function with a CustomError", async () => {
        const registerUserData: RegisterData = {
          username: "rodrigo",
          password: "1234",
          email: "rod@drigo.com",
        };
        const req: Partial<Request> = {
          body: registerUserData,
        };
        const error = new Error("");
        User.create = jest.fn().mockRejectedValue(error);

        await registerUser(
          req as Request,
          res as Response,
          next as NextFunction
        );
        expect(next).toBeCalledWith(error);
      });
    });
  });
});

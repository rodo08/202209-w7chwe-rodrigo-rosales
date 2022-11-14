import "../loadEnvironment";
import request from "supertest";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../database/models/Users.js";
import app from "../server/app.js";
import connectDatabase from "../database/index.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

const registerData = {
  username: "rodrigo",
  password: "1234",
  email: "rod@rigo.com",
};

describe("Given a POST /users/login endpoint", () => {
  const loginData = {
    username: "rodrigo",
    password: "1234",
  };

  describe("When it receives a request with the username 'rodrigo' and the password '1234' which exist in the database", () => {
    test("Then it should respond with a 200 status and a token", async () => {
      const expectedStatus = 200;

      const hashedPassword = await bcrypt.hash(registerData.password, 10);

      await User.create({
        username: registerData.username,
        password: hashedPassword,
        email: registerData.email,
      });

      const response = await request(app)
        .post("/users/login/")
        .send(loginData)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token");
    });
  });

  describe("When it receives a request with username 'rodrigo' and password '1234' which doesn't exist  in the database", () => {
    test("Then it should respond with a response status 401 and the message 'Wrong credencials'", async () => {
      const expectedStatus = 401;

      const response = await request(app)
        .post("/users/login/")
        .send(loginData)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", "Wrong Credentials");
    });
  });

  describe("When it receives a request with username 'rodrigo' and password '5678' and password is incorrect", () => {
    test("Then it should respond with a 401 response status and the message 'Wrong credentials'", async () => {
      const expectedStatus = 401;

      const hashedPassword = await bcrypt.hash(registerData.password, 10);

      await User.create({
        username: registerData.username,
        password: hashedPassword,
        email: registerData.email,
      });

      const wrongLoginData = {
        username: "rodrigo",
        password: "5678",
      };

      const response = await request(app)
        .post("/users/login/")
        .send(wrongLoginData)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", "Wrong Credentials");
    });
  });
});

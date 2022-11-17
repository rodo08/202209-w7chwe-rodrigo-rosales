import express from "express";
import { loginUser } from "../server/controllers/userControllers/userControllers.js";

const usersRouter = express.Router();

usersRouter.post("/login", loginUser);

usersRouter.post("/signup", registerUser);

export default usersRouter;

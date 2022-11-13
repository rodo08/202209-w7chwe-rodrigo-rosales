import "../loadEnvironment.js";
import express from "express";
import morgan from "morgan";
import { generalError, unknownEndpoint } from "../middlewares/errors/errors.js";
import usersRouter from "../routers/userRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/users", usersRouter);

app.use(generalError);

app.use(unknownEndpoint);

export default app;
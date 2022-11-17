import "../loadEnvironment.js";
import express from "express";
import morgan from "morgan";
import { generalError, unknownEndpoint } from "../middlewares/errors/errors.js";
import usersRouter from "../routers/userRouter.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "https://202209-w7chwe-rodrigo-rosales-front.netlify.app/",
      "http://localhost:4000",
      "http://localhost:3000",
    ],
  })
);

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.use("/users", usersRouter);

app.use(generalError);

app.use(unknownEndpoint);

export default app;

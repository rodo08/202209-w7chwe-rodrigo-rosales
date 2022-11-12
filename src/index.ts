import environment from "./loadEnvironment.js";
import express from "express";
import startServer from "./server/index.js";

const { port } = environment;

const app = express();

await startServer(app, +port);

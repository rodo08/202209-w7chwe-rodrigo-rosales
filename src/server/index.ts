import "../loadEnvironment.js";
import debugCreator from "debug";

import chalk from "chalk";

import type { Express } from "express";

const debug = debugCreator("users:server");

const startServer = async (app: Express, port: number) => {
  await new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      resolve(server);
    });

    server.on("error", (error: Error) => {
      reject(error);
    });
  });
};

export default startServer;

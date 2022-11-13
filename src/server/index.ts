import "../loadEnvironment.js";

import type { Express } from "express";

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

import chalk from "chalk";
import debugCreator from "debug";
import type { Express } from "express";

const debug = debugCreator("users:server");

const startServer = async (app: Express, port: number) => {
  await new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.blue(`Server listening to port ${port}`));
      resolve(server);
    });

    server.on("error", (error: Error) => {
      debug(chalk.red(`There's an error on server ${error.message}`));
      reject(error);
    });
  });
};

export default startServer;

import "./loadEnvironment.js";
import debugCreator from "debug";
import startServer from "./server/index.js";
import environment from "./loadEnvironment.js";
import chalk from "chalk";
import connectDatabase from "./database/index.js";
import app from "./server/app.js";

const debug = debugCreator("users:server");
const { port, mongoDbUrl } = environment;

try {
  await startServer(app, +port);
  debug(chalk.magenta("Start server"));

  await connectDatabase(mongoDbUrl);
  debug(chalk.blue("Connect data base"));
} catch (error: unknown) {
  debug(`Error connecting to the database ${(error as Error).message}
`);
}

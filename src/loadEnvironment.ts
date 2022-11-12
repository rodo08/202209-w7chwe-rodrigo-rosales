import dotenv from "dotenv";
dotenv.config();

const environment = {
  port: process.env.PORT,
  mongoDbDebug: process.env.DEBUG,
};

export default environment;

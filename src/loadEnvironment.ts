import dotenv from "dotenv";
dotenv.config();

const environment = {
  port: process.env.PORT,
  mongoDbDebug: process.env.DEBUG,
  secretWord: process.env.JWS_SECRET,
  mongoDbUrl: process.env.MONGO_URL,
};

export default environment;

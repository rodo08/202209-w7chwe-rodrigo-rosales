import CustomError from "./CustomError.js";

const loginError = {
  userNotFound: new CustomError("Wrong Credentials", 401, "Incorrect username"),
  incorrectPassword: new CustomError(
    "Incorrect password",
    401,
    "Wrong Credentials"
  ),
};

export default loginError;

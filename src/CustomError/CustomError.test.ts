import CustomError from "./CustomError";

describe("Given a CustomError", () => {
  describe("When it is invoked with the message 'General error', a status code 400, and a public message 'something went wrong, please try again later'", () => {
    test("Then it should create an object with these three properties", () => {
      const expectedError = {
        message: "An error ocurred",
        statusCode: 400,
        publicMessage: "This is a private massage",
      };

      const expectedMessage = expectedError.message;
      const expectedCode = expectedError.statusCode;
      const expectedPublicMessage = expectedError.publicMessage;

      const newCustomError = new CustomError(
        expectedMessage,
        expectedCode,
        expectedPublicMessage
      );

      expect(newCustomError).toHaveProperty("message", expectedMessage);
      expect(newCustomError).toHaveProperty("statusCode", expectedCode);
      expect(newCustomError).toHaveProperty(
        "publicMessage",
        expectedPublicMessage
      );
    });
  });
});

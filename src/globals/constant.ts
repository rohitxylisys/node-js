export const Constant = {
  SUCCESS_MESSAGES: {
    SIGN_UP_SUCCESS: "Sign Up Successfully..!",
    LOGIN_SUCCESS: "Login Successfully..!",
    FORGOT_PASSWORD_SUCCESS:
      "Forgot Password  Link Successfully sent to Email..!",
    RESET_PASSWORD_SUCCESS: "Reset Password Successfully..!",
  },
  ERROR_MESSAGES: {
    INTERNAL_SERVER_ERROR: "Internal Server Error.",
    USER_ALREADY_EXISTENT: "User already exists.",
    USER_NOT_FOUND: "User not found.",
    PASSWORD_WRONG: "Password incorrect. Please try again.",
    SESSION_EXPIRED: "Your session for link is expired. Please try again.",
  },
  RESPONSE_CODES: {
    SUCCESS: 200,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    SERVICE_UNAVAILABLE: 503,
  },
};

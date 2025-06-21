class CustomError extends Error {
  constructor(message, statuscode) {
    super(message);
    this.statusCode = statuscode;
    this.name = this.constructor.name;
  }
}

class ValidationError extends CustomError {
  constructor(message = "Validation Error") {
    super(message, 400);
  }
}

class DataNotFoundError extends CustomError {
  constructor(message = "No Data Found") {
    super(message, 400);
  }
}

class BadRequestError extends CustomError {
  constructor(message = "Bad Request") {
    super(message, 500);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class ForbiddenRequestError extends CustomError {
  constructor(message = "Forbidden Request") {
    super(message, 403);
  }
}

module.exports = {
  CustomError,
  ForbiddenRequestError,
  UnauthorizedError,
  BadRequestError,
  DataNotFoundError,
  ValidationError,
};

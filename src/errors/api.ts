export class ApiError {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export class UnauthenticatedError extends ApiError {
  constructor(message: string) {
    super(message);
  }
}

export class ValidationError<T> extends ApiError {
  errors: T;

  constructor(message: string, errors: T) {
    super(message);
    this.errors = errors;
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message);
  }
}

export class CsrfMismatchError extends ApiError {
  constructor(message: string) {
    super(message);
  }
}

export class ServerError extends ApiError {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message);
  }
}

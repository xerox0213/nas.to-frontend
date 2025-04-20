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

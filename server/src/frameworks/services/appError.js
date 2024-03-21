export default class AppError extends Error {
  constructor(message, statusCode,) {
    super(message);

    this.statusCode = statusCode || 404;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Object.setPrototypeOf(this, AppError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.success = false
    this.code = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

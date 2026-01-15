export class AppError extends Error {
    constructor(message, statusCode, details = []) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.details = details;
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.details = err.details || [];
  
    if (process.env.NODE_ENV === 'development') {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        details: err.details,
        stack: err.stack
      });
    } else {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        details: err.details
      });
    }
  };
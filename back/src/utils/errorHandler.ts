import { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from "mongoose";

const GENERIC_MESSAGE =
  "Une erreur est survenue. Merci de réessayer plus tard.";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = GENERIC_MESSAGE;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = `${GENERIC_MESSAGE} - ${err.message}`;
  } else if (err instanceof MongooseError.ValidationError) {
    statusCode = 422;
    const errors = Object.values(err.errors).map((e: any) => e.message);
    message = `${GENERIC_MESSAGE} - Validation failed: ${errors.join(", ")}`;
  } else if (err instanceof MongooseError.CastError) {
    statusCode = 400;
    message = `${GENERIC_MESSAGE} - Invalid ${err.path}: ${err.value}`;
  } else if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${GENERIC_MESSAGE} - Duplicate field: ${field}`;
  } else if (err.message) {
    message = `${GENERIC_MESSAGE} - ${err.message}`;
  }

  req.app.locals.logger?.error(
    `[ERROR] ${req.method} ${req.path} | Status: ${statusCode} | ${err.message}`,
    { stack: err.stack }
  );

  res.status(statusCode).json({
    code: statusCode,
    message: message,
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};

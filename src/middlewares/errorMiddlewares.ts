import "../loadEnvironments.js";
import createDebug from "debug";
import { ValidationError } from "express-validation";
import RobotError from "../routers/RobotError.js";
import { type NextFunction, type Request, type Response } from "express";

const debug = createDebug("robots-api:server:middleware:errorMiddlewares");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new RobotError(404, "Error, not found");
  next(error);
};

export const genericError = (
  error: RobotError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(error.message);
  const statusCode = error.statusCode || 500;

  if (error instanceof ValidationError) {
    const validationError = error.details
      .body!.map((joiError) => joiError.message)
      .join(" & ")
      .replaceAll("\\/", "");
    const publicError = validationError;
    debug(publicError);
  }

  const message = error.statusCode ? error.message : "Internal Server Error";

  res.status(statusCode).json({ message });
};

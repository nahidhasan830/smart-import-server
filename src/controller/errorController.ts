import appError from '../utils/appError';
import { ErrorRequestHandler, Request, Response } from 'express';

interface IError {
  status: string;
  statusCode: number;
  message: string;
  isOperational: boolean;
  stack?: any;
}

const handleCastErrorDB = (error: { path: string; value: string }) => {
  const message = `Invalid ${error.path}: ${error.value}.`;
  return new appError(message, 400);
};

const handleValidationErrorDB = (error: { errors: Object }) => {
  const errors = Object.values(error.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new appError(message, 400);
};

const handleDuplicateFieldsDB = (error: { errmsg: any }) => {
  const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new appError(message, 400);
};
const sendErrorDev = (error: IError, req: Request, res: Response) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    error,
    stack: error.stack
  });
};

const sendErrorProd = (error: IError, req: Request, res: Response) => {
  if (!error.isOperational) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message
  });
};

const errorController: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, req, res);
  else {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);

    sendErrorProd(error, req, res);
  }
};

export default errorController;

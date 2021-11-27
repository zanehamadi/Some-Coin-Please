import { validationResult } from 'express-validator';
import {GeneralError} from '../app'

export const handleValidationErrors = (req:any, _res:any, next:any) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = new GeneralError('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};


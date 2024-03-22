import AppError from '../../services/appError';
import { validationResult } from 'express-validator';

export default function validatorErrorHandler (req, res, next) {
  const errors = validationResult(req);
  let newErrors = [];

  if(!errors.isEmpty()){
    const mappedErrors = errors.mapped();

    for(let key in mappedErrors){
      newErrors.push(mappedErrors[key]);
    }
  }

  for(let error of newErrors){
    switch (error.path) {
      case 'email':
        throw new AppError(error.msg);
      case 'Password':
        throw new AppError(error.msg)
      case 'confirmPassword':
        throw new AppError(error.msg)
      default:
        return next();
    }
              
  }

  next();
}
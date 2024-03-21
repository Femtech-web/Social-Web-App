import AppError from '../../services/appError';

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
        return next(new AppError(error.msg, 400));
      case 'Password':
        return next(new AppError(error.msg, 400));
      case 'confirmPassword':
        return next(new AppError(error.msg, 400));
      default:
        return next();
    }
              
  }

  next();
}
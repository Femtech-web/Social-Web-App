import AppError from '../../services/appError';

export default function incorrectRoutesMiddleware  (req, res, next) {
  const errMessage = 'Route not found';
  const errCode = 404;

  next(new AppError(errMessage, errCode));
};
import userController from '../../../controllers/userController';
import userDbRepository from '../../../application/repositories/userDbRepository';
import userDbRepositoryMongoDB from '../../database/mongoDB/repositories/userRepositoryMongoDB';
import authServiceInterface from '../../../application/services/authServiceInterface';
import authServiceImpl from '../../services/authService';
import authMiddleware from '../middlewares/authMiddleware';
import validatorErrorHandler from '../middlewares/validatorErrorHandler';
import {
requireFullname, 
requireEmail, 
requirePassword, 
requirePasswordConfirmation} from '../middlewares/validatorsMiddleware';

export default function userRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = userController(
    userDbRepository,
    userDbRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl
  );

  // GET endpoints
  router.route('/:id').get(authMiddleware, controller.fetchUserById);
  router.route('/').get(authMiddleware, controller.fetchUsersByProperty);

  // POST endpoint
  router.route('/').post(
    [
      requireFullname, 
      requireEmail, 
      requirePassword, 
      requirePasswordConfirmation
    ], validatorErrorHandler, controller.addNewUser);

  return router;
}

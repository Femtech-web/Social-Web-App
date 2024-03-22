import authController from '../../../controllers/authController';
import userDbRepository from '../../../application/repositories/userDbRepository';
import userDbRepositoryMongoDB from '../../database/mongoDB/repositories/userRepositoryMongoDB';
import authServiceInterface from '../../../application/services/authServiceInterface';
import authServiceImpl from '../../services/authService';
import validatorErrorHandler from '../middlewares/validatorErrorHandler';
import { requirePasswordExists, requireEmailExists } from '../middlewares/validatorsMiddleware'

export default function authRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = authController(
    userDbRepository,
    userDbRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl
  );

  // POST endpoint
  router.route('/')
    .post(
      [
        requirePasswordExists, 
        requireEmailExists
      ], validatorErrorHandler, controller.loginUser);

  return router;
}

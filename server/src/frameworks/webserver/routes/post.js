import postController from '../../../adapters/controllers/postController';
import postDbRepository from '../../../application/repositories/postDbRepository';
import postDbRepositoryMongoDB from '../../database/mongoDB/repositories/postRepositoryMongoDB';
import postRedisRepository from '../../../application/repositories/postRedisRepository';
import postRedisRepositoryImpl from '../../database/redis/postRepositoryRedis';
import redisCachingMiddleware from '../middlewares/redisCachingMiddleware';
import authMiddleware from '../middlewares/authMiddleware';

export default function postRouter(express, redisClient) {
  const router = express.Router();

  // load controller with dependencies
  const controller = postController(
    postDbRepository,
    postDbRepositoryMongoDB,
    redisClient,
    postRedisRepository,
    postRedisRepositoryImpl
  );

  // GET endpoints
  router
    .route('/')
    .get(
      [authMiddleware, redisCachingMiddleware(redisClient, 'posts')],
      controller.fetchAllPosts
    );
  router
    .route('/:id')
    .get(
      [authMiddleware, redisCachingMiddleware(redisClient, 'post')],
      controller.fetchPostById
    );

  // POST endpoints
  router.route('/').post(authMiddleware, controller.addNewPost);
  router.route('/search').post(authMiddleware, controller.fetchPostsBySearch);
  router.route('/likePost/:id').post(authMiddleware, controller.likePost);
  router.route('/commentPost/:id').post(authMiddleware, controller.commentPost);

  // PUT endpoints
  router.route('/:id').patch(authMiddleware, controller.updatePostById);

  // DELETE endpoints
  router.route('/:id').delete(authMiddleware, controller.deletePostById);

  return router;
}

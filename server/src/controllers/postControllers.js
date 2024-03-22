import findAll from "../application/use_cases/post/findAll";
import countAll from "../application/use_cases/post/countAll";
import findBySearch from "../application/use_cases/post/findBySearch";
import addPost from "../application/use_cases/post/add";
import findById from "../application/use_cases/post/findById";
import updateById from "../application/use_cases/post/updateById";
import deletePost from "../application/use_cases/post/deleteById";
import likePostById from "../application/use_cases/post/likePostById";
import commentById from "../application/use_cases/post/commentById";
import AppError from "../frameworks/services/appError";

export default function postController(
  postDbRepository,
  postDbRepositoryImpl,
  cachingClient,
  postCachingRepository,
  postCachingRepositoryImpl,
) {
  const dbRepository = postDbRepository(postDbRepositoryImpl());
  const cachingRepository = postCachingRepository(
    postCachingRepositoryImpl()(cachingClient),
  );

  // Fetch all the posts of the logged in user
  const fetchAllPosts = (req, res, next) => {
    let params = {};
    let response = {};

    // Dynamically created query params based on endpoint params
    for (const key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        params[key] = req.query[key];
      }
    }
    // predefined query params (apart from dynamically) for pagination
    // and current logged in user
    params.page = params.page ? parseInt(params.page, 10) : 1;
    params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;
    params.creator = req.user.id;

    findAll(params, dbRepository)
      .then((posts) => {
        response.posts = posts;
        return countAll(params, dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.perPage);
        response.itemsPerPage = params.perPage;

        const cachingOptions = {
          key: "posts_",
          expireTimeSec: 900,
          data: JSON.stringify(response),
        };
        // cache the result to redis
        cachingRepository.setCache(cachingOptions);
        return res.status(200).json(response);
      })
      .catch((error) => next(error));
  };

  const fetchPostsBySearch = async (req, res, next) => {
    const { query } = req.query;
    const title = new RegExp(query, "i");

    findBySearch(title, dbRepository)
      .then((searchedPosts) => {
        res.status(200).json(searchedPosts);
      })
      .catch((error) => next(error));
  };

  const fetchPostById = (req, res, next) => {
    findById(req.params.id, dbRepository)
      .then((post) => {
        if (!post) {
          throw new AppError(`No post found with id: ${req.params.id}`, 404);
        }
        res.status(200).json(post);
      })
      .catch((error) => next(error));
  };

  const addNewPost = (req, res, next) => {
    const { img } = req.body;

    addPost({
      ...req.body,
      selectedFile: img,
      userId: req.user.id,
      createdAt: new Date().toISOString(),
      postRepository: dbRepository,
    })
      .then((post) => {
        // delete former posts cache
        cachingRepository.delCache("posts_");

        const cachingOptions = {
          key: `post_${post._id}`,
          expireTimeSec: 900,
          data: JSON.stringify(post),
        };
        // cache the result to redis
        cachingRepository.setCache(cachingOptions);
        return res.status(201).json(post);
      })
      .catch((error) => next(error));
  };

  const deletePostById = (req, res, next) => {
    deletePost(req.params.id, dbRepository)
      .then((deletedPost) => {
        // delete former posts and post cache
        cachingRepository.delCache(`posts_${deletedPost._id}`);
        cachingRepository.delCache("posts_");

        res.json({ message: `post ${deletedPost._id} sucessfully deleted!` });
      })
      .catch((error) => next(error));
  };

  const updatePostById = (req, res, next) => {
    updateById({
      ...req.body,
      id: req.params.id,
      userId: req.user.id,
      createdAt: new Date().toISOString(),
      postRepository: dbRepository,
    })
      .then((updatedPost) => {
        // delete former posts cache
        cachingRepository.delCache("posts_");

        const cachingOptions = {
          key: `post_${updatedPost._id}`,
          expireTimeSec: 900,
          data: JSON.stringify(updatedPost),
        };
        // cache the updated result to redis
        cachingRepository.setCache(cachingOptions);
        res.status(200).json(updatedPost);
      })
      .catch((error) => next(error));
  };

  const likePost = (req, res, next) => {
    const { id } = req.params;
    const userId = req.user.id;

    likePostById(id, userId, dbRepository)
      .then((likedPost) => res.status(200).json(likedPost))
      .catch((error) => next(error));
  };

  const commentPost = (req, res) => {
    const { id } = req.params;
    const { finalComment } = req.body;

    commentById(id, finalComment, dbRepository)
      .then((updatedPost) => res.status(200).json(updatedPost))
      .catch((error) => next(error));
  };

  return {
    fetchAllPosts,
    fetchPostsBySearch,
    addNewPost,
    likePost,
    commentPost,
    fetchPostById,
    updatePostById,
    deletePostById,
  };
}

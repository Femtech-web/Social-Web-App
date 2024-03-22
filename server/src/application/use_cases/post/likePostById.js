import AppError from '../../../frameworks/services/appError';

export default function likePostById({
  id,
  userId,
  postRepository
}) {
  return postRepository.findById(id).then((foundPost) => {
    if (!foundPost) {
      throw new AppError(`No post found with id: ${id}`, 404);
    }

    const index = foundPost.likes.findIndex((_id) => _id === userId);
    if(index === -1){
      foundPost.likes.push(req.userId);
    } else {
      foundPost.likes = post.likes.filter((_id) => _id !== req.userId)
    }

    return postRepository.updateModifiedPost(id, foundPost);
  });
}

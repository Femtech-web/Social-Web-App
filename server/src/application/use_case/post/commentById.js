import AppError from '../../../frameworks/services/appError';

export default function commentById({
  id,
  finalComment,
  postRepository
}) {
  return postRepository.findById(id).then((foundPost) => {
    if (!foundPost) {
      throw new AppError(`No post found with id: ${id}`, 404);
    }

    foundPost.comments.push(finalComment)
    return postRepository.updateModifiedPost(id, foundPost);
  });
}

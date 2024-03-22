import AppError from "../../../frameworks/services/appError";

export default function deleteById(id, postRepository) {
  return postRepository.findById(id).then((post) => {
    if (!post) {
      throw new AppError(`No post found with id: ${id}`, 404);
    }
    return postRepository.deleteById(id);
  });
}

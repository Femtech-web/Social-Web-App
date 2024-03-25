import post from "../../../entities/post";
import AppError from "../../../frameworks/services/appError";

export default function updateById({
  id,
  title,
  context,
  createdAt,
  name,
  tags,
  userId,
  postRepository,
}) {
  if (!title || !context) {
    throw new AppError("title and description fields are mandatory", 400);
  }
  const updatedPost = post({
    title,
    context,
    createdAt,
    name,
    tags,
    userId,
  });

  return postRepository.findById(id).then((foundPost) => {
    if (!foundPost) {
      throw new AppError(`No post found with id: ${id}`, 404);
    }
    return postRepository.updateById(id, updatedPost);
  });
}

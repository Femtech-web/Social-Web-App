import post from '../../../entities/post';
import AppError from '../../../frameworks/services/appError';

export default function addPost({
  title,
  context,
  name,
  tags,
  createdAt,
  userId,
  selectedFile,
  postRepository
}) {
  if (!title || !context) {
    throw new AppError('title and description fields cannot be empty', 400);
  }

  const newPost = post({ title, context, name, tags, createdAt, selectedFile, userId });

  return postRepository.add(newPost);
}

import AppError from '../../../frameworks/services/appError';

export default function findBySearch(searchTerm, postRepository) {
  if (!searchTerm) {
    throw new AppError('search term is null', 400);
  }

  return postRepository.findBySearch(searchTerm);
}

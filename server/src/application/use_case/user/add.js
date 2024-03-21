import user from '../../../src/entities/user';
import AppError from '../../../frameworks/services/appError';

export default function addUser(
  fullname,
  password,
  email,
  role,
  createdAt,
  userRepository,
  authService
) { 
  if (!fullname || !password || !email) {
    throw new AppError('username, password and email fields cannot be empty', 403);
  }

  const newUser = user(
    fullname,
    authService.encryptPassword(password),
    email,
    role,
    createdAt
  );

  return userRepository.add(newUser);
}

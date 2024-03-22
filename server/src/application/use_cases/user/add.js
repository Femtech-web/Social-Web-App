import user from '../../../entities/user';
import AppError from '../../../frameworks/services/appError';

export default async function addUser(
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

  const hashedPassword = await authService.createHashedPassword(password);
  const newUser = user(
    fullname,
    hashedPassword,
    email,
    role,
    createdAt
  );

  return userRepository
    .findByProperty({ email })
    .then((userWithEmail) => {
      if (userWithEmail.length) {
        throw new AppError(`User with email: ${email} already exists`, 403);
      }
      return userRepository.add(newUser);
    });
}

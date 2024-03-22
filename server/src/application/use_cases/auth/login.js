import AppError from "../../../frameworks/services/appError";

export default function login(email, password, userRepository, authService) {
  console.log(password)
  return userRepository.findByEmail(email).then(async (user) => {
    if (!user)
      throw new AppError('Invalid email or password', 400);

    const isMatch = await authService.comparePasswords(user.password, password);
    if (!isMatch)
      throw new AppError('Invalid email or password', 400);

    const payload = {
      user: {
        id: user._id,
        email: user.email
      }
    };
    const signedToken = authService.generateToken(payload);
    return { signedToken, user};
  })
}

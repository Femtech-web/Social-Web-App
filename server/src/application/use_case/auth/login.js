import AppError from "../../../frameworks/services/appError";

export default function login(email, password, userRepository, authService) {
  return userRepository.findByEmail(email).then((user) => {
    if (!user.length) {
      throw new AppError('Invalid email or password', 401);
    }

    const payload = {
      user: {
        id: user._id,
        email: user.email
      }
    };
    const signedToken = authService.generateToken(payload);
    return { signedToken, user};
  });
}

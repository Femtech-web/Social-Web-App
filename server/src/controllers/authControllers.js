import login from '../../application/use_cases/auth/login';

export default function authController(
  userDbRepository,
  userDbRepositoryImpl,
  authServiceInterface,
  authServiceImpl
) {
  const dbRepository = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const loginUser = (req, res, next) => {
    const { email, password } = req.body;
    login(email, password, dbRepository, authService)
      .then(({
        signedToken, user
      }) => res.status(200).json({result: user, token: signedToken}))
      .catch((err) => next(err));
  };
  return {
    loginUser
  };
}

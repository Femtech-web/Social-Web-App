export default function authServiceInterface(service) {
  const createHashedPassword = (password) => service.createHashedPassword(password);

  const comparePasswords = (password, hashedPassword) =>
    service.comparePasswords(password, hashedPassword);

  const verify = (token) => service.verify(token);

  const generateToken = (payload) => service.generateToken(payload);

  return {
    createHashedPassword,
    comparePasswords,
    verify,
    generateToken
  };
}

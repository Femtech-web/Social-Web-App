export default function authServiceInterface(service) {
  const createHashedPassword = (password) => service.encryptPassword(password);

  const comparePasswords = (password, hashedPassword) =>
    service.compare(password, hashedPassword);

  const verify = (token) => service.verify(token);

  const generateToken = (payload) => service.generateToken(payload);

  return {
    createHashedPassword,
    comparePasswords,
    verify,
    generateToken
  };
}

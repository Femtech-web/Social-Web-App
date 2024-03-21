import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import util from 'util';
import config from '../../config';

const scrypt = util.promisify(crypto.scrypt);

export default function authService() {
  const createHashedPassword = async (password) => {
    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(password, salt, 64);

    return `${buf.toString('hex')}.${salt}`
  };

  const comparePasswords = async (saved, supplied) => {
    const [ hashed, salt ] = saved.split('.');

    const suppliedBuf = await scrypt(supplied, salt, 64);
    const suppliedHash = suppliedBuf.toString('hex');

    return hashed === suppliedHash;
  };

  const verify = (token) => jwt.verify(token, config.jwtSecret);

  const generateToken = (payload) =>
    jwt.sign(payload, config.jwtSecret, {
      expiresIn: "1d"
    });

  return {
    createHashedPassword,
    comparePasswords,
    verify,
    generateToken
  };
}

const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);


const createHashedPassword = async (password) => {
    const salt = crypto.randomBytes(8).toString('hex');

    const buf = await scrypt(password, salt, 64);

    return `${buf.toString('hex')}.${salt}`
};

const comparePasswords = async (saved, supplied) => {
    const [ hashed, salt ] = saved.split('.');

    const suppliedBuf = await scrypt(supplied, salt, 64);
    const suppliedHash = suppliedBuf.toString('hex')

    return hashed === suppliedHash;

};

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomToken = token.length < 500;

    try {
        let decodedToken;
        if(token){
            if(isCustomToken){
                 decodedToken = jwt.verify(token, process.env.SECRET)

                req.userId = decodedToken?.id;
            }else{
                decodedToken = jwt.decode(token);

                req.userId = decodedToken?.sub;
            }
        }

        next();
    } catch (error) {
        console.log(error); 
    }
} 

module.exports = { createHashedPassword, comparePasswords, verifyToken }
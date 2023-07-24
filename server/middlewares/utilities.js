const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const util = require('util');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

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

const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    let newErrors = [];

    if(!errors.isEmpty()){
      const mappedErrors = errors.mapped();

      for(let key in mappedErrors){
        newErrors.push(mappedErrors[key]);
      }
    }

    for(let error of newErrors){
        switch (error.path) {
            case 'email':
                return res.status(400).send({ message: `${error.msg}`});
                break;
            case 'Password':
                return res.status(400).send({ message: `${error.msg}`});
                break;
            case 'confirmPassword':
                return res.status(400).send({ message: `${error.msg}`});
                break;
            default:
                return next();
        }
                
    }

    next();
}

const checkAuth = (req, res, next) => {
    if(!req.userId) return res.status(404).json({ message: 'You are not authenticated, pls login!'});

    next();
}

const checkPostAuth = (req, res, next) => {
    if(!req.userId) return res.status(404).json({ message: 'You are not authenticated, pls login!'});
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('no post with that id');

    next();
}

module.exports = { createHashedPassword, comparePasswords, verifyToken, handleErrors, checkAuth, checkPostAuth }
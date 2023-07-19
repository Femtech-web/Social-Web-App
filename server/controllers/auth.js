const jwt = require('jsonwebtoken');

const User = require('../models/user')
const { createHashedPassword, comparePasswords } = require('../middlewares/utilities');

const signUp = async (req, res) => {
    const { fullname, email, password, confirmPassword } = req.body;
    
    try {
        const user = await User.findOne({ email });

        if(user){
            return res.status(400).send({ message: 'User already exist, please login!'})
        }

        if(password !== confirmPassword){
            return res.status(400).json({ message: 'Passwords do not match'})
        }

        const hashedPassword = await createHashedPassword(password);

        const createdUser = await User.create({fullname, email, password: hashedPassword})
        const token = jwt.sign({ id:createdUser._id, email: createdUser.email}, process.env.SECRET, {expiresIn: '1d'})
       
        res.status(200).json({result: createdUser, token})
    } catch (error) {
        console.log(error);     
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        const doesPasswordMatch = await comparePasswords(existingUser.password, password);

        if(!existingUser){
            return res.status(400).send({ message: 'User does not exist, please Create an Account first!'})
        }
        
        if(!doesPasswordMatch){
            return res.status(400).json({ message: 'Passwords do not match'})
        }

        const token = jwt.sign({ id:existingUser._id, email: existingUser.email}, process.env.SECRET, {expiresIn: '1d'});
        res.status(200).json({result: existingUser, token}) 
    } catch (error) {
        console.log(error);
    }   
};

module.exports = { signUp, signIn };
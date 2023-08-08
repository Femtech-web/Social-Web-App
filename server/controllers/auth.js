const jwt = require('jsonwebtoken');

const User = require('../models/user')
const { createHashedPassword } = require('../middlewares/utilities');

const getUsers = async (req, res) => {
    const allUsers = await User.find().sort({fullname: 1})

    res.status(200).json(allUsers)
}

const signUp = async (req, res) => {
    const { fullname, email, password } = req.body;
    
    try {
        const hashedPassword = await createHashedPassword(password);

        const createdUser = await User.create({fullname, email, password: hashedPassword})
        const token = jwt.sign({ id:createdUser._id, email: createdUser.email}, process.env.SECRET, {expiresIn: '1d'})
       
        res.status(200).json({result: createdUser, token})
    } catch (error) {
        console.log(error);     
    }
};

const signIn = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        
        const token = jwt.sign({ id:existingUser._id, email: existingUser.email}, process.env.SECRET, {expiresIn: '1d'});
        res.status(200).json({result: existingUser, token}) 
    } catch (error) {
        console.log(error);
    }   
};

module.exports = { signUp, signIn, getUsers };
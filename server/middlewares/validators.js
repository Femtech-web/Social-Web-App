const { check } = require('express-validator');

const User = require('../models/user');
const { comparePasswords } = require('../middlewares/utilities');

module.exports = {
    requireFullname: check('fullname')
        .trim()
        .isLength({ min: 4, max: 40})
        .withMessage("Must be a character between 5 and 40"),

    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom( async email => {
            const existingUser = await User.findOne({ email });
            if(existingUser){
                throw new Error("Email in use")
        };

        }),

    requirePassword: check('password')
        .trim()
        .isLength({ min: 4, max: 20})
        .withMessage('Must be between 4 and 20 characters'),

    requirePasswordConfirmation: check('confirmPassword')
        .trim()
        .isLength({ min: 4, max: 20})
        .withMessage('Must be between 4 and 20 characters')
        .custom(async (confirmPassword, { req }) => {
            if(confirmPassword !== req.body.password){
            throw new Error('passwords must match')
        }
    }),

    requireEmailExists:  check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must provide a valid email')
        .custom(async (email) => {
            const user = await User.findOne({ email });

            if(!user){
            throw new Error("Email not found")
        };
        }),

    requirePasswordExists: check('password')
        .trim()
        .custom(async (password, { req }) => {
            const user = await User.findOne({ email: req.body.email });
            
            if(!user){
                throw new Error("Invalid password")
            };

            const isValidPassword = await comparePasswords(user.password, password);
            if(!isValidPassword){
            throw new Error("Invalid password")
        }
        })
}

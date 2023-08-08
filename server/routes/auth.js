const express = require('express');

const { signUp, signIn, getUsers } = require('../controllers/auth');
const { handleErrors } = require('../middlewares/utilities');
const { requireFullname, requireEmail, requirePassword, 
requirePasswordConfirmation, requireEmailExists, requirePasswordExists } = require( '../middlewares/validators');
    

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', [requireFullname, requireEmail, 
requirePassword, requirePasswordConfirmation], handleErrors, signUp);
router.post('/signin', [requireEmailExists, requirePasswordExists], signIn);


module.exports = router;
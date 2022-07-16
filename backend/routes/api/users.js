// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid Email'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Invalid Email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Sign up
router.post('/',
    validateSignup,
    async (req, res, next) => {
      const { firstName,lastName, email, password } = req.body;

      //Body Validation
      if(!email || !firstName || !lastName){
        const err = new Error('Validation Error');
        err.status = 400;
        err.message = 'Validation Error';
        err.errors = [];
  
        if(!email) err.errors.push("Invalid email");
        if(!firstName) err.errors.push("First Name is required");
        if(!lastName) err.errors.push("Last Name is required");
        return next(err);
      }

      const foundUser = await User.findOne({ where:{email: email}});
      // console.log(foundUser)
      if(!foundUser){
        const user = await User.signup({  firstName,lastName,email, password });
        // console.log(user);

        const token = await setTokenCookie(res, user);
        user.dataValues['token'] = token;
        // console.log(user);

        return res.json(user);
      
      } else {
        const err = new Error('User already exists')
        err.status = '403',
        err.errors = ['User with that email already exists']
        return next(err);
      }
    }
  );

//Login
router.post('/login', validateLogin,
  async (req, res, next) => {

    const {email, password} = req.body;

    if(!email || !password){
      const err = new Error('Validation Error');
      err.status = 400;
      err.message = 'Validation Error';
      err.errors = [];

      if(!email) err.errors.push("Email is required");
      if(!password) err.errors.push("Password is required");
      return next(err);
    
    }

    const user = await User.login({email, password});

    if(!user){
      const err = new Error('Invalid Credentials');
      err.status = 401;
      err.message = 'Invalid Credentials';
      return next(err);
    }

    await setTokenCookie(res, user);  // Sends a JWT Cookie
    return res.json(user);
  }
);

//Get the Current User
  router.get('/:currentUserId',requireAuth, 
  async(req,res) => {

    const user = await User.findByPk(req.params.currentUserId);
   
    res.json({
      user
   });

  });

  module.exports = router;
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
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName,lastName, email, password, username } = req.body;
      const user = await User.signup({ email, username, password });
  
      await setTokenCookie(res, user);
  
      return res.json({
        user
      });
    }
  );

//Login
router.post(
  '/login',
  async (req, res, next) => {

    const {email, password, username} = req.body;

    if(!email || !password){
      const err = new Error('Validation Error');
      err.status = 400;
      err.message = 'Validation Error';
      err.errors = [];

      if(!email) err.errors.push("Email is required");
      if(!password) err.errors.push("Password is required");
      return next(err);
    
    }

    const credential = email ? email : username; //check if credential is email or username
    const user = await User.login({credential, password});

    if(!user){
      const err = new Error('Invalid Credentials');
      err.status = 401;
      err.message = 'Invalid Credentials';
      return next(err);
    }

    // await setTokenCookie(res, user);
    
    return res.json({
      user
    });
  }
);


//Get the Current User
  router.get('/:currentUserId',requireAuth, async(req,res) => {

    const user = await User.findByPk(req.params.currentUserId);
   
    res.json({
      id: user.id,
      firstName: user.firstName,
      lasttName: user.lastName,
      email: user.email
   });

  });



  module.exports = router;
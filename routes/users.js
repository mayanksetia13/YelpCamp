const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync')
const users = require('../controllers/users')


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), users.loginPOST)


// IF NOT USING ROUTER.ROUTE() THEN USE THE CODE BELOW

// // FORM render page to Create a new User
// router.get('/register', users.renderRegister)

// // POST request submitting the New User
// router.post('/register',catchAsync(users.register));

// // Form render page to LOGIN a User
// router.get('/login', users.renderLogin)

// // POST requset after Users clicks on Login Button
// router.post('/login',passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), users.loginPOST)

// // Logout Request
router.get('/logout', users.logout)


module.exports = router;
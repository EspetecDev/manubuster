const {sendRecoverPwdMail} = require('../helpers/userHelpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    // Check valid request data
    if( !email || !password) {
        res.status(400);
        throw new Error('email or password not correct');
    }

    // Check for email
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id, name: user.name, email:user.email, token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('invalid credentials');
    }
});

// @desc register
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        res.status(400).json({reason: 'Please add all fields'});
        throw new Error('Please add all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400).json({reason: 'Email already registered'});
        throw new Error('Email already registered');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPwd,
    });

    if(user){
        res.status(201).json({
            _id: user.id, name: user.name, email:user.email, token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('could not create user');
    }
});

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email } = await User.findById(req.user.id);
    res.json({id: _id, name, email});
});

// @desc Get user data
// @route  /api/users/recoverPassword
// @access Public
const recoverPassword = asyncHandler(async(req, res) => {
    try {
        
        const {email} = req.body;
    
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({reason: 'This email is not registered'});
            throw new Error('This email is not registered');
            next();
        }
    
        const recoverToken = '';
        const url = `${process.env.BACKEND_URI}/users/recoverPassword/${recoverToken}`;
        const name = user.name;
        sendRecoverPwdMail(url, name, email);
        res.status(200).json({reason: 'Check your email for resetting your password', debug: url});
    } catch (error) {
        res.status(500).json({reason:'Internal error'});
        throw new Error('Internal error');
    }
});

const checkAndResetPassword = asyncHandler(async(req, res) => {
    try {
        const {token} = req.params;
        console.log(`token to check: ${token}`);
    
        if(checkToken(token))
            res.status(200).json({reason: 'Check your email for resetting your password'})
        else
            res.status(500).json({reason: 'Something went wrong'})
    } catch (error) {
        res.status(500).json({reason: 'Something went wrong'})
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '30d'});
}

const checkToken = (token) => {
    return true;
}



module.exports = {
    loginUser,
    registerUser,
    getMe,
    recoverPassword,
    checkAndResetPassword
}
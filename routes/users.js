const express = require('express');
const router = express.Router();
const User = require('../models/user')
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user'})
        } else {
            res.json({ success: true, msg: 'User registered'})
        }
    })
});

// Authenticate route
router.post('/authenticate', (req, res, next) => {
    
    const username = req.body.username;
    const password = req.body.password;
    
    // First Check if user exists
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'})
        }
        // If user exists check the password
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({data: user}, process.env.JWT_SECRET, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'})
            }
        });
    })
});

// Profile route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({ user: req.user });
});


module.exports = router;
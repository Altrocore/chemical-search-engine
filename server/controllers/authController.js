const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  try {
    await newUser.save();
    res.status(201).json({ success: true, msg: 'Successfully created new user.' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ success: false, msg: 'Username already exists.' });
    } else {
      res.status(500).json({ success: false, msg: 'Error creating user.', error: err });
    }
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res.status(401).json(info);
    }

    try {
      const tokenUser = {
        id: user._id,
        username: user.username
      };

      const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
        expiresIn: '15m'
      });

      res.json({ user: tokenUser, token });
    } catch (tokenErr) {
      res.status(500).json({ message: 'Error signing token', error: tokenErr });
    }
  })(req, res, next);
};

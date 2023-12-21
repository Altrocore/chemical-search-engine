// /server/controllers/authController.js

const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

exports.signup = (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  newUser.save((err) => {
    if (err) {
      return res.json({ success: false, msg: 'Username already exists.' });
    }
    res.json({ success: true, msg: 'Successful created new user.' });
  });
};

exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '15m' 
      });
      return res.json({ user, token });
    });
  })(req, res);
};

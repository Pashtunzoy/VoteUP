import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import config from '../main';
import User from '../models/user';
import jwt from 'jsonwebtoken';

export default () => {
  const apiRouter = express.Router();

  apiRouter.post('/register', (req, res) => {
    if(!req.body.email || !req.body.password) res.json({success: false, message: 'Please enter an emai & password to register'});

    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    newUser.save((err) => {
      if(err) res.json({success: false, message: 'That email address already exists.'});
      res.json({success: true, message: 'Sucessfuly signed up.'})
    });
  });


  apiRouter.post('/authenticate', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if(err) throw err;
      if(!user) return res.json({sucess: false, message: 'Authentication failed. User not found.'});
      user.comparePassword(req.body.password, (err, isMatch) => {
          if(isMatch && !err) {
            const token = jwt.sign(user.toObject(), config.secret, {
              expiresIn: 86400
            });
            return res.json({success: true, token: `JWT ${token}`})
          }
          res.send({sucess: false, message: 'Authentication failed. Password did not match.'});
      });
    });
  });


  // This route will require JWT token to get access to.
  apiRouter.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).send(`Access Granted & info for the access is: ${req.user.email}`);
  });

  return apiRouter;
};

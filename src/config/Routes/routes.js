import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import passport from 'passport';
import config from '../main';
import User from '../models/user';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.param("uID", (req, res, next, id) => {
  User.findById(id, (err, doc) => {
    if(err) return next(err);
    if(!doc) {
      err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }
    req.uID = doc;
    return next();
  });
});

router.param("pID", (req, res, next, id) => {
  req.poll = req.uID.polls.id(id);
  if (!req.poll) {
    const err = new Error("Not Found");
    err.status = 404;
    return next(err);
  }
  next();
});

router.param("oID", (req, res, next, id) => {
  req.option = req.poll.poll.id(id);
  if (!req.option) {
    const err = new Error("Not Found");
    err.status = 404;
    return next(err);
  }
  next();
});

router.post('/register', (req, res) => {
  if(!req.body.email || !req.body.password) return res.json({success: false, message: 'Please enter an email & password to register'});

  const newUser = new User({
    email: req.body.email,
    password: req.body.password
  });

  console.log(req.body);
  
  newUser.save((err) => {
    if(err) res.json({success: false, message: 'That email address already exists.'});
    res.json({success: true, message: 'Sucessfuly signed up.'});
  });
});


router.post('/authenticate', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({sucess: false, message: 'Authentication failed. User not found.'});
    user.comparePassword(req.body.password, (err, isMatch) => {
        if(isMatch && !err) {
          const token = jwt.sign(user.toObject(), config.secret, {
            expiresIn: 86400
          });
          return res.json({success: true, data: user, token: `JWT ${token}`});
        }
        res.send({sucess: false, message: 'Authentication failed. Password did not match.'});
    });
  });
});


  // This route will require JWT token to get access to.
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({success: true, data: req.user});
});


// GET all user Data together with polls
router.get('/:uID', (req, res, next) => {
  res.json(req.uID.polls);
});

// POST new poll
router.post('/:uID/new', (req, res, next) => {
  req.uID.polls.push(req.body);
  req.uID.save((err, poll) => {
    if(err) return next(err);
    res.status(201);
    res.json(poll);
  });
});

// GET single POLL based on ID
router.get('/:uID/polls/:pID', (req, res, next) => {
  // console.log('It worked and here is the data:', req.poll);
  console.log(req.poll.id);
  res.json(req.poll);
});

// Delete single POLL based on ID
router.delete('/:uID/polls/:pID/', (req, res, next) => {
  // console.log(req.poll.id);
  req.uID.polls.pull({_id: req.poll.id });
  req.uID.save((err, result) => {
    if(err) return next(err);
    res.json(result.polls);
  });
});

// GET single POLL option based on ID
router.get('/:uID/polls/:pID/option/:oID', (req, res, next) => {
  // console.log('It worked and here is the data:', req.option);
  res.json(req.option);
});

// POST to Up Vote an Option of a Poll
router.post('/:uID/polls/:pID/option/:oID', (req, res, next) => {
  const pID = req.params.pID;
  const oID = req.params.oID;
  req.uID.polls.id(pID).poll.id(oID).value += 1;
  req.uID.save((err, result) => {
    if(err) return next(err);
    res.status(201);
    res.json(result.polls.id(pID));
  });
});

export default router;

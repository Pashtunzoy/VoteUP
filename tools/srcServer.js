import express from 'express';
import webpack from 'webpack';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors' ;
import passport from 'passport';
import config from '../webpack.config.dev';
import open from 'open';
import config from '../src/config/main';
import User from '../src/config/models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import jwtStrategy from '../src/config/auth/passport';
import apiRouter from '../src/config/Routes/apiRoutes';
/* eslint-disable no-console */

const port = process.env.PORT || 8000
const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));

const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));


mongoose.connect(config.database);
app.use(passport.initialize());
jwtStrategy(passport);

// Allow requests from any origin

app.use('/api', apiRouter());


app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`http://localhost:${port}`);
  }
});

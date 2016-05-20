var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.listen(process.env.PORT || 3000);



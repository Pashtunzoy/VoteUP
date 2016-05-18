var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Where it begans');
});


app.listen(process.env.PORT || 3000);



var express = require('express');
var fs      = require('fs');
var amazon  = require('./server/api/amazon');
var morgan  = require('morgan');
var parser  = require('body-parser');
var logger  = morgan('combined');
var app     = express();

//log all requests
// app.use(express.logger());

//support json and url encoded requests
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// Set CORS Values:
app.use(function(req, res, next) {
  console.log('------HEADERS-------');
  console.log(app.locals);
  console.log('------END_HEADERS-------');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/amazon/getReviews', amazon.getReviews);

// [START server]
var server = app.listen(process.env.PORT || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://localhost:'+port);
});
// [END server]

exports = module.exports = app;
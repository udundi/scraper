var express   = require('express');
var http      = require('http');
var fs        = require('fs');
var amazon    = require('./api/amazon');
// var compressor   = require('./api/compressor');
var instagram = require('./api/instagram');
var shopify   = require('./api/shopify');
var youtube   = require('./api/youtube');
var iframeReplacement = require('./api/shopify/node-iframe-replacement.js');
var morgan    = require('morgan');
var parser    = require('body-parser');
var logger    = morgan('combined');
var app       = express();

//log all requests
// app.use(express.logger());

//support json and url encoded requests
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// add iframe replacement to express as middleware (adds res.merge method)
app.use(iframeReplacement);

// Set CORS Values:
app.use(function(req, res, next) {
  // console.log('------HEADERS-------');
  // console.log(app.locals);
  // console.log('------END_HEADERS-------');
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

// app.use('/dist', express.static('public'));
app.use('/dist', express.static('public'));

app.get('/amazon/getReviews', amazon.getReviews);
app.get('/instagram/getUser', instagram.getUser);
app.get('/instagram/getFollowers', instagram.getFollowers);
app.get('/shopify/getPage', shopify.getPage);
app.get('/youtube/getVideos', youtube.getVideos);
app.get('/youtube/getBanner', youtube.getBanner);

// [START server]
  var server = app.listen(process.env.PORT || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://localhost:'+port);
});
// [END server]

exports = module.exports = app;
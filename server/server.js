var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

// Create server
var server = express();
server.use(bodyParser.json());

// Middleware
server.use(function (req, res, next) {
  // allow origin for demo purposes
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// Start listening
var PORT = 3001;
server.listen(PORT, function() {
  console.log('listening at %s', PORT);
});



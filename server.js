var express = require('express');
var config = require('./server/configure');
var app = express();

app.set('port', process.env.PORT || 3300);

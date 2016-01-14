var path = require('path');
var routes = require('./routes');
var moment = require('moment');
var multer = require('multer');
var exphbs = require('express-handlebars');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');

module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(multer({dest:path.join(__dirname, 'public/upload/temp')}).single('file'));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser('some-secret-value-here'));
  routes(app);
  //
  app.use('/public', express.static(path.join(__dirname, '../public')));
  if('development' === app.get('env')) {
    app.use(errorHandler());
  }
  // Set views
  app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views')+'/layouts',
    partialsDir: [app.get('views')+'/partials'],
    helpers: { timeago: function(timestamp) {
      return moment(timestamp).startOf('minute').fromNow();
    }}
  }).engine);
  app.set('view engine', 'handlebars');
  return app;
};

var express = require('express');
var path = require('path');
var app = express();
var logger = require('morgan');
var colors = require('colors/safe');
var mongoose = require('mongoose');
var ejs = require('ejs');
var engine = require('ejs-mate');
var config = require('./config');
var bodyParser = require('body-parser');

//var multer = require('multer');
// var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
// var MongoStore = require('connect-mongo')(expressSession);
// var passport = require('passport');

// var passportConfig = require('./auth/passport-config');
// passportConfig();

// database connection
mongoose.connect(config.mongoUri, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(colors.green("Connected to the database"));
  }
});

require("./models/item-categories-model");
require("./models/cuisines-model");
require("./models/users-model");
require("./models/shops-model");
require("./models/merchants-model");
require("./models/shop-types-model");
require("./models/delivery-locations-model");
require("./models/runners-model");
require("./models/promotions-model");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(cookieParser());
//  var MemoryStore = expressSession.MemoryStore;
// app.use(expressSession(
//   {
//     secret:'dev',
//     saveUninitialized: true,
//     resave: true,
//     cookie: { 
//       maxAge: 86400000,
//       secure: false,
//       httpOnly: false
//        },
//     store: new MongoStore({ url: config.mongoUri, autoReconnect: true})
//   }
// ));

app.use(expressSession({
    secret:'dev',
    resave: true,
    saveUninitialized: true
  }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// });
// app.use(multer({ storage: storage }).any());


// app.get('/Register', function(req, res, next) {
//   res.render('register');
// });

// routing
app.use('/Signup', require('./routes/signup'));
app.use('/Login', require('./routes/login'));
app.use('/Merchant', require('./routes/merchant'));
app.use('/Products', require('./routes/products'));
app.use('/Transactions', require('./routes/transactions'));
app.use('/Users', require('./routes/users'));
app.use('/Runners', require('./routes/runners'));
app.use('/Tracker', require('./routes/tracker'));
app.use('/Promotions', require('./routes/promotions'));

app.use('/RunnerApi/Login', require('./routes/runner/login'));
app.use('/RunnerApi/Signup', require('./routes/runner/signup'));
app.use('/RunnerApi/Dashboard', require('./routes/runner/dashboard'));
app.use('/RunnerApi/Transactions', require('./routes/runner/transactions'));
app.use('/RunnerApi/Settings', require('./routes/runner/settings'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // error response
  res.status(err.status || 500);
  res.send();
  //console.log(colors.red(err.status || 500));
  //console.log(err);
});

module.exports = app;
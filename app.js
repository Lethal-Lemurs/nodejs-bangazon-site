'use strict';

const express = require('express');
const app = express();
const passport = require('passport')
var session = require('express-session');
let bodyParser = require('body-parser');
const flash = require('express-flash');
const methodOverride = require('method-override');


require('dotenv').config();
const port = process.env.PORT || 8080;

// using require('./models') to get the models may create more than one connection to the database. To avoid that, the models variable must be somehow singleton-esque. This can be achieved by attaching the models module to the application:
app.set('models', require('./models')); //pulls in models/index.js by default. Index exports all the models you define in the models folder. So cool.
// And when you need to require a class of the model in a controller, use this insise a middleware function rather than a direct import:
// const { Computer } = req.app.get('models');

app.set('view engine', 'pug');
app.locals.globalWow = "Express is, like, MAGIC"; //If we end up needing some value to be available to every pug template, look into using something like this that can be accessed in the templates just like any variable we pass directly to the template.

let routes = require('./routes/');

// Begin middleware stack
// Inject session persistence into middleware stack
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret

// function by glen, taught to glen by jon
app.use(function(req, res, next) {
  const { Product_type } = req.app.get('models');
  Product_type.findAll({raw: true})
  .then(  (productTypes) => {
    res.locals.prodTypes =  productTypes;
    next();
  })
  .catch( (err) => {
    next(err);
  });
})

// function by Dustin, taught to Dustin by Glen, taught to Glen by Jon
app.use(function(req, res, next) {
  const { Product } = req.app.get('models');
  Product.findAll({raw: true})
  .then( (products) => {
    products.sort(function(a, b) {
      a = new Date(a.date_added);
      b = new Date(b.date_added);
      return a>b ? -1 : a<b ? 1 : 0;
    })
    if(products.length > 20){
      let array = [];
      for(let i = 0; i < 20; i++){
        array.push(products[i])
      }
      products = array;
    }
    res.locals.products = products;
    next();
  })
  .catch( (err) => {
    next(err);
  });
})

//execute passport strategies file
require('./config/passport-strat.js');
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
// This custom middleware adds the logged-in user's info to the locals variable,
// so we can access it in the Pug templates
app.use( (req, res, next) => {
  res.locals.session = req.session;
  // console.log('res.locals.session', res.locals.session);
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(flash());

// note that this needs to be after the above stuff
app.use(routes);


// Add a 404 error handler
// Add error handler to pipe all server errors to from the routing middleware

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// no use server.js but app.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');


var port = process.env.PORT || 1998;
mongoose.connect(config.database);
app.set('FirstPassword', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(morgan('dev'));

app.get('/',function(req,res){
    res.send("Hi, connect successfully! ^^_");
})

app.use((req,res,next)=>{
    res.header(
        "Access-Control-Allow-Origin",
        "http://owen-blog-node.herokuapp.com"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.listen(port);
console.log('http://localhost:' + port);

var setupRoute = require('./app/routes/setup');

app.use('/setup',setupRoute);

var userRoute = require('./app/routes/user');

app.use('/user',userRoute);

var categoryRoute = require('./app/routes/category');

app.use('/category',categoryRoute);

var blogRoute = require('./app/routes/blog');

app.use('/blog',blogRoute);


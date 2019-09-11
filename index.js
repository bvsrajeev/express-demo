const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
//returns a function whose return type is an objes
const express = require('express');
const logger = require('./logger');
const authenticate = require('./authenticate');
const Joi = require('joi');
const morgan = require('morgan');
const courses = require('./routes/courses')
const home = require('./routes/home');
//calling express() function returns an object
const app = express();

//its a middle ware to enable parsing json objecs
app.use(express.json());
app.use(logger);
app.use(authenticate);
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api/courses',courses);
app.use('/',home);

app.set('view engine','pug');
app.set('views','./views');//it is anyway default thing

console.log(`application name: ${config.get('name')}`);
console.log(`application mail server: ${config.get('mail.host')}`);
console.log(`application password: ${config.get('mail.password')}`);

if(app.get('env') === 'development'){
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled!!!');
}


//db work
dbDebugger('db connected!!!');




//port number is dynamically allocated in hosting environment by setting
//an environment variable. so port is selected as follows:
//if an env variable called port is set use that else use 3000
const port = process.env.PORT;
app.listen(port,()=>console.log(`listening to port ${port}....`));

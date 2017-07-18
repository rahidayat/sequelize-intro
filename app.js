const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');


const index = require ('./routers/index');
const guru = require ('./routers/teachers');
const subjek = require ('./routers/subjects');
const murid = require ('./routers/students');


app.set('view engine', 'ejs');
var path_name = path.join(__dirname, 'public');
var express_static = express.static(path_name);
app.use(express_static);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.use('/', index);
app.use('/teachers', guru);
app.use('/subjects', subjek);
app.use('/students', murid);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))



app.listen(process.env.PORT || 3000);

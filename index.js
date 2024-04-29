const express = require("express");
const path = require("path");
const router = require("./routers/routers")
const bodyParser = require('body-parser');
var session = require('express-session')

const app = express()

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:"$i7emaFac7uraci0n",
    resave: false,
    saveUninitialized:false
}))

app.use(express.static(path.join(__dirname,"public")))
app.use(router)

// Server Listen
app.listen(process.env.PORT || 3000);

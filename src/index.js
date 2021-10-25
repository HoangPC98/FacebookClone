const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser');
const AllRoute = require('./routes/all-route')

require('dotenv').config()

app = express();

let port = 3003

// body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// path
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'))

// view engine
// app.use(ejsLayouts)
app.set('view engine', 'ejs')

// connecy to DB
const ConnectDB = require('./config/database')
ConnectDB()

// cookie parser
app.use(cookieParser());

AllRoute(app)


//==============================


// listen server running
app.listen(port, ()=> {
    console.log(`server is listening at http://localhost:${port}`)
})


// =================================================================================================

// - Dependences/modules

// - Upload file to DB
// multer
// multer-gridfs-storage 
// gridfs-stream


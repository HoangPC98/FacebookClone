const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const ejsLayouts = require('express-ejs-layouts')
app = express();

let port = 3456

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


// app.get('/', (req,res)=>{
//     res.render('postnew.ejs')
// })

let route = require('./routes/route-index.js')
// route(app)

let AuthenController = require('./controllers/AuthenController')
let PostController = require('./controllers/PostController')
let ApiController = require('./controllers/ApiController')

// Routes
app.get('/', (req,res)=>{
    res.render('ex')
})
app.get('/login', (req,res)=>{
    console.log('login get')
    res.render('auth',{error:''})
})
app.post('/signup', AuthenController.PostSignUp)

app.post('/login', AuthenController.PostLogIn)

app.post('/postnews', PostController.SubmitPostNews)

app.post('/like-change', PostController.LikeChange)

app.post('/post-comment', PostController.PostComment)

// Call API to Get data
app.get('/api/posts', ApiController.GetPosts)
app.get('/api/get-user-display', ApiController.GetUserDisplay)
app.get('/api/get-comments/:postid', ApiController.GetCommentViaPostId)

// listen server running
app.listen(port, ()=> {
    console.log(`server is listening at http://localhost:${port}`)
})


// =================================================================================================


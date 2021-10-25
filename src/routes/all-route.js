// const uploadRoute = require('./upload')
const Grid = require('gridfs-stream')
const mongoose = require('mongoose');
let FileModel = require('../models/Files')

// const PostModel = require('.')
// const UserModel = require('./models/Users')

const AuthenController = require('../controllers/AuthenController')
const PostController = require('../controllers/PostController')
const ApiController = require('../controllers/ApiController')
const SiteController = require('../controllers/SiteController')

// const FileController = require('../controllers/FileController')


function AllRoute(app){

    
    // let gridfs
    // const conn = mongoose.connection
    // conn.once('open', function(){
    //     gridfs = Grid(conn.db, mongoose.mongo)
    //     gridfs.collection("fs.files")
    // })
    
    // app.use('/file', uploadRoute)

    app.get('/', (req,res)=>{
        res.render('auth',{error:''})
    })
    
    app.get('/wall-page', (req,res)=>{
        res.render('wall-page')
    })
    
    app.post('/postnews', PostController.SubmitPostNews)

    app.get('/home', SiteController.GetHome, SiteController.NextIfGetHomeFail)
    
    app.post('/signup', AuthenController.PostSignUp)
    
    app.post('/login', AuthenController.PostLogIn)

    app.post('/like-change', PostController.LikeChange)

    app.post('/post-comment', PostController.PostComment)

    app.post('/get-data-user-logined', ApiController.GetDataUserLogined)

    // app.post('/search', ApiController.PostSearch)

    // Seacrh Input

    app.get('/search', ApiController.GetSearch)


    // Call API to Get data
    app.get('/api/all-posts', ApiController.GetAllPosts)
    app.get('/api/user-logined-posts/:uid', ApiController.GetUserLoginedPosts)
    app.get('/api/get-user-display', ApiController.GetUserDisplay)
    app.get('/api/get-comments/:postid', ApiController.GetCommentViaPostId)
    // Get FIle
    // app.get('/file/:filename', async (req,res)=>{
    //     console.log('FILE HERE')
    //     FileModel.findOne({filename: req.params.filename})
    //     .then(data=>{
    //         console.log('data file', data)
    //     })
    // })
}

module.exports = AllRoute
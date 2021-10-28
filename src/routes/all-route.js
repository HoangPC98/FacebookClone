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
   
   
    const multer = require('multer')

    // config storage location, filename
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './src/public/uploads')
        },
        filename: function (req, file, callback) {
            let fileName = Date.now() + '-' + file.originalname
            callback(null, fileName)
        }
    })
    

    var upload = multer({storage: storage})  // 
    app.post('/postnew', upload.single('postimg'), PostController.SubmitPostNews)  

    // app.post('/postnews', PostController.SubmitPostNews)

    
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
    
    app.get('/change-avt', (req,res)=>{
        res.render('change-avt-overlay')
    })

    app.get('/home', SiteController.GetHome, SiteController.NextIfGetHomeFail)

    // Truy cập trang cá nhân của User Logined
    // app.get('/profile/me', SiteController.GetProfileMePage)

    app.get('/profile/:uid', SiteController.GetProfileUid)
    
    app.post('/signup', AuthenController.PostSignUp)
    
    app.post('/login', AuthenController.PostLogIn)

    app.post('/like-change', PostController.LikeChange)

    app.post('/post-comment', PostController.PostComment)

    app.post('/edit-post/:pid', upload.single('editimg'), PostController.EditPost)

    // app.post('/get-data-user-logined', ApiController.GetDataUserLogined)


    app.post('/change-avt/:uid', upload.single('input_upload_avt'), ApiController.ChangeAvt)

    // app.post('/search', ApiController.PostSearch)

    // Seacrh Input

    app.get('/search', ApiController.GetSearch)

    app.get('/get-all-user', ApiController.GetAllUser)

    app.get('/delete-post/:pid', PostController.DeletePost)
    // Call API to Get data

    app.get('/get-data-user/:uid', ApiController.GetDataUserLogined)
    app.get('/api/all-posts', ApiController.GetAllPosts)
    app.get('/get-user-posts/:uid', ApiController.GetUserLoginedPosts)
    app.get('/api/get-user-display', ApiController.GetUserDisplay)
    app.get('/api/get-comments/:postid', ApiController.GetCommentViaPostId)
    

    
}

module.exports = AllRoute
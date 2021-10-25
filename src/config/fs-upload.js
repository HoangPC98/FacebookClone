// const multer = require('multer')
// const {GridFsStorage} = require('multer-gridfs-storage')


// let storage = new GridFsStorage({
//     url: process.env.DB_URI,
//     options: {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     },
//     file: (req,file) =>{
//         const match = ['image/png', 'image/jpeg']
//         if(match.indexOf(file.mimetype) === -1){
//             const filename = `${Date.now()}-any-name-${file.originalname}`
//             return filename 
//         }    

//         // ko thi... return...
//         return{
//             bucketname: 'photos',
//             fielname: `${Date.now()}-any-name-${file.originalname}`
//         }
//     }
// })

// module.exports = multer({ storage})
   
// // const upload = multer({ storage: storage })

// // const storage = multer.diskStorage({
// //     destination: function (req, file, callback) {
// //       callback(null, '/public/my-uploads')
// //     },
// //     filename: function (req, file, callback) {
// //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // define 1 chuỗi prefix duy nhất kèm tên file upload để thánh bị trùng
// //       callback(null, file.fieldname + '-' + uniqueSuffix)
// //     }
// //   })

// // // the ROute get file chose upload form a HTML form
// // app.post('/profile', upload.single('image'), function (req, res, next) {
// //     // req.file is the `avatar` file
// //     // req.body will hold the text fields, if there were any
// //     let newPost = new PostModel({
// //         uid: dataUser._id,
// //         content: req.body.content,
// //         img: req.file.filename,
// //         userInfo:{
// //             userName: dataUser.userName,
// //             avatarUrl:  dataUser.avatar,
// //         }
// //     })

// // })
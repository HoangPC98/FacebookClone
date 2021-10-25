
let PostModel = require('../models/Posts')
let UserModel = require('../models/Users')

class ApiController{
    GetAllPosts(req,res){
        PostModel.find({})
        .then((data) => {
            console.log('GET ALL POSTS DATA', data)

            res.json(data)
        })
        .catch((err) => {
            res.status(500).json({error: err})
        })
    }

    GetUserLoginedPosts(req,res){
        console.log('POST USER LOGIN', req.params.uid)
        let userId = req.params.uid

        PostModel.find({ uid: userId})
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(500).json({error: err})
        })
    }

    GetUserDisplay(req,res){
        UserModel.find({})
        .then((data) => {
            let displayData = []
            data.map(item_data=>{
                displayData.push({
                    uid: item_data._id,
                    userName: item_data.userName,
                    avatar: item_data.avatar
                })
            })
            console.log(displayData)
            res.json(displayData)
        })
    }
    GetCommentViaPostId(req,res){
        console.log('req.params', req.params.postid)
        PostModel.findOne({_id: req.params.postid})
        .then((data) =>{
            console.log(data)
            let commentData = data.reactDetail.listComment
            console.log(commentData)
            res.json(commentData)
        })
        
    }

    GetSearch(req,res){
        console.log('search post....', req.query.key)
        UserModel.find({})
        .then((data) =>{

            if(data){
                // res.json(data)
                let process_data = []
                data.map(item =>{
                    if(item.userName.toLowerCase().split(' ').join('').includes(req.query.key.split('-').join(''))){
                        process_data.push({
                            uid: item._id,
                            userName: item.userName,
                            avatar: item.avatar
                        })
                    }
         
                })
                console.log('process_data', process_data)

                res.render('search-result-page', {search_data: process_data})
            }
        })
        .catch((err) =>{
            res.status(500).json({error: err})
        })
    }

    GetDataUserLogined(req,res){
        console.log('get data user.........', req.body)
        UserModel.findOne({_id: req.body.uid_logined})
        .then(data=>{
            let dataUserLogined = {
                uid: data._id,
                userName: data.userName,
                avatar: data.avatar
            }
            console.log('datauser',dataUserLogined)
            res.json({dataUserLogined})
        })
    }
    ChangeAvt(req,res){
        console.log('change avatar...', req.file.path)
        let newAvatar = '/uploads/' + req.file.filename
        console.log('mew avt', newAvatar, req.params.uid)
        UserModel.findOneAndUpdate({_id: req.params.uid}, {avatar: newAvatar}, ()=>{
            console.log('Thanh cong')
        })
        res.render('wall-page')
    }
}
module.exports = new ApiController
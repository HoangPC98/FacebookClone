
let PostModel = require('../models/Posts')
let UserModel = require('../models/Users')

class ApiController{
    GetPosts(req,res){
        PostModel.find({})
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
}
module.exports = new ApiController
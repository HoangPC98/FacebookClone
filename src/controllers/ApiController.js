
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
}
module.exports = new ApiController
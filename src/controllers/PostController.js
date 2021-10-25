const PostModel = require('../models/Posts')
const UserModel = require('../models/Users')

class PostController{
    SubmitPostNews(req, res, next){
        console.log('request payload',req.body)

        var uid = req.body.uid   
        UserModel.findOne({_id: req.body.uid})
            .then(dataUser => {
                console.log('DATA FINED',dataUser)
                const postData = new PostModel({
                    uid: dataUser._id,
                    content: req.body.content,
                    // img: req.file.filename,

                    userInfo:{
                        userName: dataUser.userName,
                        avatarUrl:  dataUser.avatar,
                    }
                })
                postData.save()
            })
            .then(() => {
                PostModel.findOne({uid: uid})
                .then(data =>{
                    res.render('main',{data: data})
                })
                .catch(err =>{
                    console.log('ERROR Catched:',err)
                })

            })
            .catch(err =>{
                console.log('ERROR Catched:',err)
            })
      
    }
    LikeChange(req,res) {
        console.log('req.body: ',req.body)
        if(req.body.change ==='inc'){
            PostModel.findOne({ _id: req.body.postId})
            .then(data=>{
                console.log('likeNumer',data.reactNumber.likeNumber)
                let newLikeNumber = data.reactNumber.likeNumber +1
                let newChange = req.body.userChange
                let listLikeUser = data.reactDetail.listLikeUser
                if(!listLikeUser.includes(newChange)){
                    listLikeUser.push(req.body.userChange)
                } 
                
                console.log('newList', listLikeUser)
                PostModel.findOneAndUpdate(
                    {_id: req.body.postId}, 
                    { 
                        "reactNumber.likeNumber": newLikeNumber , 
                        "reactDetail.listLikeUser": listLikeUser
                    },
                    ()=>{console.log('success')
                })
            })
            .catch(err =>{
                console.log('ERROR Catched:',err)
            })
        }
        else if(req.body.change ==='des'){
            PostModel.findOne({ _id: req.body.postId})
            .then(data=>{
                console.log(data.reactNumber.likeNumber)
                let newLikeNumber = data.reactNumber.likeNumber -1
                console.log(newLikeNumber, typeof newLikeNumber)
                let newChange = req.body.userChange
                let listLikeUser = data.reactDetail.listLikeUser

                // lọc bỏ những item là uid đã disLike khỏi mảng 
                listLikeUser = listLikeUser.filter(item=>{
                    return item != newChange
                })
                console.log('newLIST',listLikeUser)
                PostModel.findOneAndUpdate(
                    {_id: req.body.postId}, 
                    { 
                        "reactNumber.likeNumber": newLikeNumber , 
                        "reactDetail.listLikeUser": listLikeUser
                    } ,
                    ()=>{console.log('success')}
                )
            })
            .catch(err =>{
                console.log('ERROR Catched:',err)
            })
        }
    }

    PostComment(req,res){
        console.log('POST COMMENT')
        let commentData = req.body
        PostModel.findOne({_id: commentData.postId})
        
        .then(data =>{
            let listComment = data.reactDetail.listComment
            var avatarUserCmt
            var userNameCmt
            UserModel.findOne({_id: commentData.uid})
            .then(data =>{
                avatarUserCmt = data.avatar
                userNameCmt = data.userName
                listComment.push({uid: commentData.uid, comment: commentData.comment, avatar: avatarUserCmt, userName: userNameCmt})
                PostModel.findOneAndUpdate({_id: commentData.postId}, {"reactDetail.listComment": listComment}, function(){console.log('Upadated Successfully')})
            })

            
        })
        .catch(err =>{
            console.log('ERROR Database:',err)
        })
    }
}

module.exports = new PostController
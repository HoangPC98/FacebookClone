const PostModel = require('../models/Posts')
const UserModel = require('../models/Users')

// const multer = require('multer')
// var upload = multer({dest: './public/my-uploads/'})  // 


class PostController{
    SubmitPostNews(req, res, next){
        console.log('request payload')
        var uid = req.body.uid   
        if(req.file){
            var path = '/uploads/' + req.file.filename
        }
        UserModel.findOne({_id: uid})
        .then(data => {
            const postData = new PostModel({
                uid: uid,
                userInfo: {
                    uid: data._id,
                    userName: data.userName,
                    avatar: data.avatar
                },
                content: req.body.content,
                img: path,
            })
            postData.save()
        })
        console.log('path...',path)
      
  
        PostModel.findOne({uid: uid})
        .then(data =>{
            res.render('main',{data: data})
        })
        .catch(err =>{
            console.log('ERROR Catched:',err)
        })    

        res.redirect('/home')
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

                // l???c b??? nh???ng item l?? uid ???? disLike kh???i m???ng 
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
            var commentNumber = data.reactNumber.commentNumber
        
            UserModel.findOne({_id: commentData.uid})
            .then(data =>{
                avatarUserCmt = data.avatar
                userNameCmt = data.userName
                commentNumber += 1
                listComment.push({uid: commentData.uid, comment: commentData.comment, avatar: avatarUserCmt, userName: userNameCmt})
                PostModel.findOneAndUpdate({_id: commentData.postId}, {"reactDetail.listComment": listComment, "reactNumber.commentNumber": commentNumber}, function(){console.log('Upadated Successfully')})
            })

            res.redirect('/home')
        })
        .catch(err =>{
            console.log('ERROR Database:',err)
        })
    }

    DeletePost(req,res){
        console.log('DELETE....')
        PostModel.findOne({_id: req.params.pid}, (err, data)=>{
            data.remove()
        })
        res.json({message: 'Thanh cong'})
    }

    EditPost(req,res){
        console.log('req....', req.body, req.file)
        // N???u c?? thay ?????i img
        if(req.file){
            let pathFileUploaded = '/uploads/' + req.file.filename
            PostModel.findOneAndUpdate({_id: req.params.pid},{content: req.body.content, img: pathFileUploaded}, (err, data)=>{console.log('Da Upadate')})
        }

        // N???u ko ch??? thay ?????i content
        else
            PostModel.findOneAndUpdate({_id: req.params.pid},{content: req.body.content}, (err, data)=>{console.log('Da Upadate')})

        res.redirect('/home')
    }
}

module.exports = new PostController
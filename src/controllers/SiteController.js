const UserModel = require('../models/Users')
const PostModel = require('../models/Posts')

class SiteController{
    GetHome(req,res,next){
        //check xem có cookie login chưa, chưa có thì bắt đăng nhập
        try{
            let cookie_user_logined = JSON.parse(req.cookies.user_logined)
            if(cookie_user_logined){
                next()
            }
        }catch(err){
            console.log('Loi chua login')
            return res.render('auth',{error: 'Bạn chưa đăng nhập !'})
        }
        let cookie_user_logined = JSON.parse(req.cookies.user_logined)
        console.log('cokkie login', cookie_user_logined.userName)
        // res.render('main')
        // next()
    }

    GetProfileMePage(req,res){
        res.render('profile-page')
    }

    GetProfileUid(req,res){  
        let uid = req.params.uid
        var dataUser
        var dataPosts
        UserModel.findOne({_id: uid})
        .then(data_user => {
            dataUser = {
                uid: data_user._id,
                userName: data_user.userName,
                avatar: data_user.avatar,
                gender: data_user.gender
            }
            PostModel.find({uid: req.params.uid})
            .then(data_posts=>{
                dataPosts = data_posts
                let dataProfile = JSON.stringify(dataUser)
                res.cookie('data_profile', dataProfile).render('profile-page',{viewdata:{dataUser:dataUser, dataPosts:dataPosts}})
            })
            .catch(err=>{
                res.json({'err:' : err})
            })
        })
        .catch(err=>{
            res.json({'err:' : err})
        })
      

    }

    NextIfGetHomeFail(req,res){
        res.render('main')
    }
}

module.exports = new SiteController
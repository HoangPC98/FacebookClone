

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
    NextIfGetHomeFail(req,res){
        res.render('main')
    }
}

module.exports = new SiteController
const UserModel = require('../models/Users')
const PostModel = require('../models/Posts')


class AuthenController{
    PostSignUp(req,res){

        UserModel.findOne({email : req.body.email})
        .then( result => {
            if(result){
                res.json({message: 'Đăng kí thất bại do trùng Username/Email/SĐT'});
            }
            else{
                // console.log('PostSignUp', req.body)

                const formData = req.body
                const storeData = new UserModel(formData) // tạo ra 1 instance Schema Prodcut mới và đổ data vào Schema
                storeData.save() // lưu lại vào Collection Account 
                // console.log('registed',req.body,storeData)
                res.send('<h2> Đăng kí thành công <a href="/login">   Đăng nhập ngay</a></h2>')
                
            }
        })
        .catch(err => {
            res.json('Lỗi server')
        })
    }

    PostLogIn = (req,res)=>{
        UserModel.findOne({email: req.body.email, password: req.body.password})
        .then(data=>{
            if(data){
                console.log('Login successful')

                let userId = JSON.stringify(data._id).toString()

                userId = userId.split('"').join('') // xóa bỏ tất cả các kí tự " trong chuỗi
                // console.log('uid2', userId)
                let userName = data.userName
                let password = data.password
                let avatar = data.avatar
                let user_logined = {
                    userId,
                    userName,
                    password,
                    avatar,
                }
                user_logined = JSON.stringify(user_logined)
                console.log('cookie userlogined',user_logined)
                res.cookie('user_logined', user_logined).render('main', {data: data})
            }
            else{
                res.render('auth',{error:'Đăng nhập thất bại, Tên đăng nhập hoặc mật khẩu không đúng'})
            }
        })

        
        
    }
}

module.exports = new AuthenController
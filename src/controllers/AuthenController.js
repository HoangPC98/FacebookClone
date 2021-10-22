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
                console.log('PostSignUp', req.body)

                const formData = req.body
                const storeData = new UserModel(formData) // tạo ra 1 instance Schema Prodcut mới và đổ data vào Schema
                storeData.save() // lưu lại vào Collection Account 
                console.log('registed',req.body,storeData)
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
                console.log('uid', userId)

                userId = userId.split('"').join('') // xóa bỏ tất cả các kí tự " trong chuỗi
                console.log('uid2', userId)
                
                res.cookie(`uid`, userId).render('main', {data: data})
            }
            else{
                res.render('auth',{error:'Đăng nhập thất bại, Tên đăng nhập hoặc mật khẩu không đúng'})
            }
        })

        
        
    }
}

module.exports = new AuthenController
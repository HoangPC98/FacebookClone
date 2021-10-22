const express = require('express');

let router = express.Router()
let AuthenController = require('../controllers/AuthenController')

let CreateRoutes = (app)=>{
    app.get('/login', (req,res)=>{
        console.log('login herre')
        res.render('auth', {error:'sad' })
    })
    app.use('/', (req,res)=>{
        res.render('main')
    })
    app.post('/signup', AuthenController.PostSignUp)
  
}

module.exports = CreateRoutes
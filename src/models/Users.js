const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    email: String,
    phone: String,
    password: String,
    gender: String,
    avatar: {type: String, default: 'https://tse3.mm.bing.net/th?id=OIP.1agWrVsY6hvojkLbQBTdXwAAAA&pid=Api&P=0&w=300&h=300'},
    status: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
})

module.exports = mongoose.model('User', UserSchema)

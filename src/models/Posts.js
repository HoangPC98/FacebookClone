const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    postId: String,
    content: String,
    uid: String,
    img: String,
  
    reactNumber:{
        likeNumber: {type: Number, default: 0},
        commentNumber: {type: Number, default:0},
        shareNumber: {type: Number, default:0},
    },
    reactDetail:{
        listLikeUser: [],
        listComment: [],
        listShare: [],
    },

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
})

module.exports = mongoose.model('Post', PostSchema)

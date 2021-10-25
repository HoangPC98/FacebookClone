const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    FileId: String,
    filename: String,
   
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
})

module.exports = mongoose.model('File', FileSchema)

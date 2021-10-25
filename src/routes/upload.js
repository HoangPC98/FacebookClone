const upload = require('../config/fs-upload')
const express = require('express')
var router = express.Router()

router.post('/upload', upload.single('file'), (req, res) => {
    // console.log('req.file',req.files)

    if(req.file === undefined){
        return res.send("No file Uploaded !")
    }
    // đặt path cho file uploaded
    const imgUrl = `http://localhost:3003/file/${req.file.filename}`
    return res.send(imgUrl)
})

module.exports = router
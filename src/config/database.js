const mongoose = require('mongoose');

let connectDB = async ()=>{
    let URI = `mongodb://localhost:27017/node_training`
    // console.log('connected successfully to ',URI)
    // return mongoose.connect(URI)
    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connnect sucessfully to', URI)
    } catch (error) {
       console.log('Connection Failed: ' + error)
    }
}

module.exports = connectDB
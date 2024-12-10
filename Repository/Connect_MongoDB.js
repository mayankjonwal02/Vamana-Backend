const { Db } = require('mongodb')
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MongoURI,
            {
                dbName: 'VamanaDB'
            }
        )
        console.log('------------------------------MongoDB connected-----------------------------')
    } catch (error) {
        console.log("MongoDB connection error: " + error)
        
    }

    return 
}


module.exports = {connectDB}
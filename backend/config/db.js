const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

const db = process.env.mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            dbName: 'Bulletin',
        });
        console.log('MongoDb Connected');
    }
    catch (err) {
        console.log("Error ", err);
        console.log('MongoDb Connection Error');
        process.exit(1);
    }
}

module.exports = connectDB;
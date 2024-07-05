const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/quizzies';

const connectToMongoose = async() => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error.message);
    }
}

module.exports = connectToMongoose;
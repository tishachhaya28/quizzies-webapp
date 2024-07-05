const mongoose = require('mongoose');
const { Schema } = mongoose;

const homeSchema = new Schema({
    heading : {
        type : String
    },
    homeTitle : {
        type : String
    },
    homeDescription : {
        type : String
    },
    index : {
        type : Number
    }
})

const Home = mongoose.model('home', homeSchema);
module.exports = Home;
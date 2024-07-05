const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionsSchema = new Schema({
    quizCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'quiz-categories'
    },
    question : {
        type : String
    },
    optionA : {
        type : String
    },
    optionB : {
        type : String
    },
    optionC : {
        type : String
    },
    optionTrue : {
        type : String
    },
    questionLevel : {
        type : String,
        default : 'medium'
    }
})

const Questions = mongoose.model('questions', questionsSchema);
module.exports = Questions;
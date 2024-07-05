const mongoose = require('mongoose');
const { Schema } = mongoose;

const quizCategorySchema = new Schema({
    catTitle: {
        type: String,
        required: true
    },
    catDiscription: {
        type: String,
        required: true
    },
    qizPoint: {
        type: Number,
        required: true
    },
    qizLavel: {
        type: String,
        required: true
    },
    userObjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    learningPath : {
        type: String
    }
});

const QuizCategory = mongoose.model('quiz-categories', quizCategorySchema);
module.exports = QuizCategory; 
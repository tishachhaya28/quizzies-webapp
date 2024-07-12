const express = require('express');
const router = express.Router();
const QuizCategory = require('../models/QuizCategory');

router.post('/add-qiz-ctgry', async (req, res) => {
    try {
        const categories = req.body;

        if (!Array.isArray(categories)) {
            return res.status(400).json({
                code: 400,
                message: "Invalid data format, expected an array of categories"
            });
        }

        const ctgryData = await Promise.all(categories.map(async category => {
            const { catTitle, catDiscription, qizPoint, qizLavel, userObjectId, learningPath } = category;
            return QuizCategory.create({
                catTitle,
                catDiscription,
                qizPoint,
                qizLavel,
                userObjectId,
                learningPath
            });
        }));

        return res.status(200).json({
            code: 200,
            message: 'Successful',
            data: ctgryData
        });

    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
});

router.get('/get-quiz-categories', async (req, res) => {
    try {
        const quizCategories = await QuizCategory.find({}, { _id: 0, __v: 0 });
        if (!quizCategories) {
            return res.status(404).json({
                code: 404,
                message: `No data found!`
            });
        }

        return res.status(200).json({
            code: 200,
            message: `All data get successfully!`,
            data: quizCategories
        });

    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
})

module.exports = router;
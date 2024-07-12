const express = require('express');
const router = express.Router();
const Questions = require('../models/Questions');

router.post('/add-question-opt', async (req, res) => {
    try {
        const questionsOpts = req.body;

        if (!Array.isArray(questionsOpts)) {
            return res.status(400).json({
                code: 400,
                message: "Invalid data format, expected an array of categories"
            });
        }

        const questionsOptsData = await Promise.all(questionsOpts.map( (qstOpt) => {
            const { quizCategory, question, optionA, optionB, optionC, optionTrue, questionLevel } = qstOpt
            return Questions.create({
                quizCategory,
                question,
                optionA,
                optionB, 
                optionC, 
                optionTrue,
                questionLevel
            })
        }))

        return res.status(200).json({
            code: 200,
            message: 'Successful',
            data: questionsOptsData
        });
        
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `Internal Server error : ${error.message}`
        })
    }
})

router.get('/get-questions-opts/:qlevel', async (req, res) => {
    try {
        const { qlevel } = req.params
        if(!qlevel === 'hard' && 'medium' && 'low'){
            return res.status(400).json({
                code : 400,
                message : `Enter high, medium or low only!`
            })
        }
        const questionOptsData = await Questions.find({questionLevel : qlevel});
        if(!questionOptsData){
            return res.status(404).json({
                code : 404,
                message : `No data found!`
            })
        }

        return res.status(200).json({
            code : 200,
            message : `Data get successfully!`,
            data : questionOptsData
        })
        
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `Internal Server error : ${error.message}`
        })
    }
})

module.exports = router;
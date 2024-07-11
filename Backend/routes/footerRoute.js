const express = require('express');
const router = express.Router();
const QuizCategory = require('../models/QuizCategory');

//ROUTE-1 : get lerning path
router.get('/learning-paths', async (req, res) => {
    try {
        //distinct method :  used to find unique values for a specified field in a collection. 
        const uniqueLearningPaths = await QuizCategory.distinct('learningPath');
        if (!uniqueLearningPaths) {
            return res.status(404).json({
                code: 404,
                message: `No data of lerning-path found!`
            });
        }
        return res.status(200).json({
            code: 200,
            message: `Lerning-path data get succesfully!`,
            data: uniqueLearningPaths
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
});

//ROUTE-2 : get data according lerning path
router.get('/:l_path', async (req, res) => {
    try {

        //replacing '_' from parameter with empty space
        const path = req.params.l_path.replace(/[_]/gi, " ").toLowerCase();

        //finding data which has 'learningPath' key
        const learningPaths = await QuizCategory.find({ learningPath: { $exists: true } });

        //convert learningPath into Lower case
        learningPaths.forEach(l => {
            l.learningPath = l.learningPath.toLowerCase();
        });

        // Check if no learningPaths are found
        if (!learningPaths || learningPaths.length === 0) {
            return res.status(404).json({
                code: 404,
                message: 'No learning paths found!'
            });
        }
        
        //finding data which has same learning-path as given in parameter
        const lerningPathData = learningPaths.filter(lPath => lPath.learningPath === path);
        if(!lerningPathData || lerningPathData.length === 0){
            return res.status(404).json({
                code: 404,
                message: `No data found for ${path}!`
            });
        }

        //successfull response
        return res.status(200).json({
            code: 200,
            message: `get all data for learning-path ${path} successfully!`,
            data : lerningPathData
        });

    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
});

module.exports = router;
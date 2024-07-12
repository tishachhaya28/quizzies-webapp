const express = require('express');
const router = express.Router();
const Home = require('../models/Home');

router.post('/home-info-add', async (req, res) => {
    try {
        const homeInfo = req.body;

        if (!Array.isArray(homeInfo)) {
            return res.status(400).json({
                code: 400,
                message: "Invalid data format, expected an array of categories"
            });
        }

        const homeInfoData = await Promise.all(homeInfo.map(async (hInfo, idx) => {
            const { heading, homeTitle, homeDescription } = hInfo;
            return Home.create({
                heading,
                homeTitle,
                homeDescription,
                index : idx
            });
        }));
        
        return res.status(201).json({
            code: 201,
            message: `Data created successfully!`,
            data : homeInfoData
        });

    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
})

router.get('/home-info', async (req, res) => {
    try {
        const homeInfoData = await Home.find({}, { _id : 0, index : 0, __v : 0 })
        if(!homeInfoData){
            return res.status(404).json({
                code: 404,
                message: `No data found`
            });
        }
        return res.status(200).json({
            code : 200,
            message : 'All data get succesfully!',
            data : homeInfoData
        })
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
})

module.exports = router;
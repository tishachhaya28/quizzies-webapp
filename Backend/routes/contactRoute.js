const express = require('express');
const router = express.Router();
const ContactInfo = require('../models/Conatctinfo');

//ROUTE : 1
router.post('/contact-info-create', async (req, res) => {
    try {
        const cInfo = req.body;

        if (!Array.isArray(cInfo)) {
            return res.status(400).json({
                code: 400,
                message: "Invalid data format, expected an array of categories"
            });
        }

        const contactInfodata = await Promise.all(cInfo.map(async info => {
            const { contactTitle, contactDescription } = info;
            return ContactInfo.create({
                contactTitle,
                contactDescription
            });
        }));

        if(!contactInfodata){
            return res.status(404).json({
                code: 404,
                message: `No data available`,
            });
        }

        return res.status(200).json({
            code: 200,
            message: 'Successful',
            data: contactInfodata
        });

    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
})

//ROUTE : 2 
router.get('/contact-info', async (req, res) => {
    try {
        const contactData = await ContactInfo.find();
        if(!contactData){
            return res.status(404).json({
                code: 404,
                message: `No data found!`
            });
        }
        return res.status(200).json({
            code: 200,
            message: `All data retrive successfull!`,
            data : contactData
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
})

module.exports = router;
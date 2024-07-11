const express = require('express');
const router = express.Router();
const User = require('../models/User');

// if(note.user.toString() !== req.user.id){
//     return res.status(401).json({
//         code : 401,
//         message : "Not Allowed!"
//     })
// }

router.get('/profile', async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId){
            res.status(401).json({
                code: 401,
                message: `Sign in to see information!`
            });
        }
        // const userData = 
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
})

module.exports = router;
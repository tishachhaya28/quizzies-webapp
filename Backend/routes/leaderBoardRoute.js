const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/leader-board', async (req, res) => {
    try {
        // Fetch all users and sort them by userPoints in descending order
        const leader_board_data = await User.find({}, 'fname lname userPoints').sort({ userPoints: -1 });
        if(!leader_board_data){
            return res.status(404).json({
                code : 404,
                message : `No data found!` 
            })
        }
        res.status(200).json({
            code : 200,
            message : `All data retrive successfully!`,
            data: leader_board_data
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
});

// if(note.user.toString() !== req.user.id){
//     return res.status(401).json({
//         code : 401,
//         message : "Not Allowed!"
//     })
// }

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authUser = require('../middleware/authUser');

router.get('/profile', async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId){
            return res.status(401).json({
                code: 401,
                message: `Sign in to see information!`
            });
        }
        // const userData = 
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
})

// Route to get and update user information
router.put('/update-user', authUser, async (req, res) => {
    try {
        const authUserId = req.user.id
        const existUser = await User.findById(authUserId);
        
        // Check if user exists
        if (!existUser) {
            return res.status(404).json({
                code: 404,
                message: 'User not found'
            });
        }

        // Update the user with new data from req.body
        const updatedUser = await User.findByIdAndUpdate(
            authUserId,
            { $set: req.body },
            { new: true } // Return the updated document
        );

        // Send the updated user data in the response
        return res.status(200).json({
            code: 200,
            message: 'User updated successfully!',
            data: updatedUser
        });

    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: `Internal Server Error: ${error.message}`
        });
    }
});


module.exports = router;
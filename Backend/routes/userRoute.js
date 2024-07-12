const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const authUser = require('../middleware/authUser');

//ROUTE - 1 : login
router.post('/sign-up', [
    body('fname').isLength({ min : 3 }).withMessage('First name must be atleast 3 charecters long'),
    body('email').isEmail().withMessage('Enter valid email!'),
    body('password').isLength({ min : 5 }).withMessage('Enter Valid password must be atlease 5 charecters')
], async (req, res) => {
    try {
        let success = false;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                code: 400,
                message: errors.array()[0].msg,
                success: false
            });
        }
        const { fname, lname, email, password } = req.body;
        const existEmail = await User.find({email});
        if(existEmail.length !== 0){
            return res.status(400).json({
                code : 400,
                message : `This email : ${email} is already taken!`,
                success
            })  
        }
        const hasPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fname,
            lname,
            email,
            password : hasPassword
        })
        if(!user){
            return res.status(404).json({
                code : 404,
                message : `No user found!`
            })   
        }
        const payload = {
            user : {
                id : user._id
            }
        };
        const authToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        return res.status(201).json({
            code : 201,
            message : `user created succesfully!`,
            success : true,
            token : authToken
        })
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `Internal Server error : ${error.message}`
        })
    }
})

//ROUTE - 2 : login
router.post('/login', async (req, res) => {
    try {
        const success = false;
        const { email, password } = req.body;
        const existUser = await User.findOne({email})
        if(!existUser){
            return res.status(400).json({
                code : 400,
                message : `Enter valid credentials to login!`,
                success
            })
        }
        const passwordCompare = await bcrypt.compare(password, existUser.password);
        if(!passwordCompare){
            return res.status(400).json({
                code : 400,
                message : `Enter valid password to login!`,
                success
            })
        }
        const payload = {
            user : {
                id : existUser._id
            }
        }
        const authToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
        return res.status(200).json({
            code : 200, 
            message : `Login successfully!`,
            token : authToken,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `Internal Server error : ${error.message}`
        })
    }
})

//ROUTE : 3 - change password with user id
router.post('/change-password', authUser, async (req, res) => {
    try {
        // getting user id from auth-token through middleware : authUser
        const authUserId = req.user.id;
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(authUserId);
        if(!user){
            return res.status(404).json({
                code : 404,
                mesage : `User is not founded!`
            })
        }
        const comparedPassword = await bcrypt.compare(oldPassword, user.password);
        if(!comparedPassword){
            return res.status(400).json({
                code : 400,
                message : `Password is invalid!`
            })
        }
        //save new entered password
        user.password = await bcrypt.hash(newPassword, 10);
        user.save();
        return res.status(200).json({
            code : 200,
            message : `Password changed successfully!`,
            data : user
        })
    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `Internal Server error : ${error.message}`
        })
    }
})

//ROUTE : 4 - TForget password API -> To-Do

//ROUTE : 5 - update userponits
router.put('/user-points/:uPoints', authUser, async (req, res) => {
    try {
        const { uPoints } = req.params;
        if(!uPoints){
            return res.status(400).json({
                code : 400,
                message : `Enter valid user points in params!`
            })
        }
        const authUserId = req.user.id;
        const updatePointsUser = await User.findById(authUserId);
        if(!updatePointsUser){
            return res.status(404).json({
                code : 404,
                message : `No user found!`
            })
        }
        updatePointsUser.userPoints += Number(uPoints);
        updatePointsUser.save()
        return res.status(200).json({
            code : 200,
            message : `User points updated successfully!`,
            data : updatePointsUser
        })

    } catch (error) {
        return res.status(500).json({
            code : 500,
            message : `Internal Server error : ${error.message}`
        })
    }
})

module.exports = router;

// body('password').isStrongPassword({ pointsForContainingNumber : 2, pointsForContainingUpper : 2}).isLength({ min : 5 }).withMessage('Enter Valid password must be atlease 5 charecters')
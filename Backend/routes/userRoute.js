const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

//ROUTE - 2 : login
router.post('/sign-up', [
    body('fname').isLength({ min : 3 }).withMessage('First name must be atleast 3 charecters long'),
    body('email').isEmail().withMessage('Enter valid email!'),
    body('password').isStrongPassword().isLength({ min : 5 }).withMessage('Enter Valid password must be atlease 5 charecters')
], async (req, res) => {
    try {
        let success = false;
        const { fname, lname, email, password } = req.body;
        const hasPassword = await bcrypt.hash(password, 10);
        const existEmail = await User.find({email});
        if(existEmail.length !== 0){
            return res.status(400).json({
                code : 400,
                message : `This email : ${email} is already taken!`,
                success
            })  
        }
        const user = await User.create({
            fname,
            lname,
            email,
            password : hasPassword
        })
        if(!user){
            return res.status().json({
                code : 500,
                message : `Internal Server error : ${error.message}`,
                success
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
        res.status(500).json({
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
            res.status(400).json({
                code : 400,
                message : `Enter valid credentials to login!`,
                success
            })
        }
        const passwordCompare = await bcrypt.compare(password, existUser.password);
        if(!passwordCompare){
            res.status(400).json({
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
        res.status(500).json({
            code : 500,
            message : `Internal Server error : ${error.message}`
        })
    }
})

module.exports = router;
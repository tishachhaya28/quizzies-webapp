const jwt = require('jsonwebtoken');

require('dotenv').config();

function authUser(req, res, next) {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({
            code : 401,
            message : `Please authenticate using valid token!`
        })
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(500).json({
            code : 500,
            message : `error : ${error.message}`
        }) 
    }
}

module.exports = authUser;
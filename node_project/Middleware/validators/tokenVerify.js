const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token ;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        console.log('token veryfied')
        next();
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Token is not valid , please log in first.'
        });
    }
}

module.exports = {
    verifyToken
};

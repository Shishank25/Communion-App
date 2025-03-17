const jwt = require('jsonwebtoken');

function authenticateToken ( req, res, next ) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if ( !token ) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.SECRET_KEY, ( err, user ) => {
        if(err) return res.sendStatus(401);
        req.user = user;
        next();
    })
} 

module.exports = {
    authenticateToken,
};
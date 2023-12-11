const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.role !== 'admin') {
            return res.status(401).json({ message: 'You are not authorized' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    };
};

module.exports = auth;

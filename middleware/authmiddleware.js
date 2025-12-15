const jwt = require('jsonwebtoken')
exports.userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'Access denied. No token provided.'
            });
        }
        const result = jwt.verify(token, process.env.SECREAT_KEY);
        req.user = result;
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: 'Invalid token'
        });
    }
};
``
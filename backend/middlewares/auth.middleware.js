const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.authorization.startsWith('Bearer')
    const token = authHeader.split('')[1]

    if (!token) {
        return res.status(400).json({ message: 'Token is required' })
    }

    try {
        const decoded = jwt.verify(token)
        req.user = decoded 
        next()
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = authMiddleware
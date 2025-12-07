const express = require('express')
const { postEnquire, getEnquires } = require('../controllers/enquires')
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware')

const eRouter = express.Router()

eRouter.post('/', postEnquire)
eRouter.get('/', getEnquires)

module.exports = eRouter
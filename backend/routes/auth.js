const express = require('express')
const { register, login } = require('../controllers/auth')
const aRouter = express.Router()

aRouter.post('/register', register)
aRouter.post('/login', login)

module.exports = aRouter
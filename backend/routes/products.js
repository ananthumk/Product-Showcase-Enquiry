const express = require('express')
const { getProduct, getProductById } = require('../controllers/product')
const authMiddleware = require('../middlewares/auth.middleware')
const pRouter = express.Router()

pRouter.get('/', getProduct)
pRouter.get('/:id', getProductById)

module.exports = pRouter
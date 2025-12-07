require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const eRouter = require('./routes/enquiries')
const pRouter = require('./routes/products')
const aRouter = require('./routes/auth')

const app = express()
const PORT = process.env.PORT || 4000 

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', aRouter)
app.use('/api/enquiries', eRouter)
app.use('/api/products', pRouter)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
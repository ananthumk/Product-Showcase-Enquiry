const db = require("../db/db")

const postEnquire = async (req, res) => {
    try {
        const {productId, name, email, phone, message} = req.body
        const query = `INSERT INTO enquiries (productId, name, email, phone, message) 
                       VALUES (?,?,?,?,?)`
        const postData = db.run(query, [productId, name, email, phone, message])
        res.status(201).json({message: 'Enquire Send', data: postData})
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

const getEnquires = async (req, res) => {
    try {
        const query = `SELECT * FROM enquiries`
        const data = db.all(query)
        res.status(200).json({data: data})
    } catch (error) {
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = { postEnquire, getEnquires }
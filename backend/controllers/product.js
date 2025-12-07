const db = require("../db/db")

const getProduct = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 10 } = req.query 

        // FIX 1: Added WHERE 1=1 so AND conditions work correctly
        let query = 'SELECT * FROM products WHERE 1=1'
        const params = []

        // FIX 2: Added space before AND
        if (search) {
            query += ' AND (name LIKE ? OR short_desc LIKE ? OR long_desc LIKE ?)'
            const searchItem = `%${search}%`
            params.push(searchItem, searchItem, searchItem)
        }

        // FIX 3: Added space before AND
        if (category) {
            query += ' AND category = ?'
            params.push(category)
        }

        // FIX 4: Fixed typo - 'SEL ECT' should be 'SELECT'
        const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total')

        // FIX 5: db.get uses callback, not return value!
        db.get(countQuery, params, (err, countResult) => {
            if (err) {
                console.error('Error counting products:', err.message)
                return res.status(500).json({ message: "Internal Server Error" })
            }

            const total = countResult.total
            const totalPages = Math.ceil(total / limit)

            const offset = (page - 1) * limit
            
            // FIX 6: Added space before ORDER BY
            query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
            params.push(parseInt(limit), offset)

            // FIX 7: db.all uses callback, not return value!
            db.all(query, params, (err, products) => {
                if (err) {
                    console.error('Error fetching products:', err.message)
                    return res.status(500).json({ message: "Internal Server Error" })
                }

                res.status(200).json({
                    data: products, 
                    pagination: {
                        page: parseInt(page),
                        limit: parseInt(limit),
                        total,
                        totalPages
                    }
                })
            })
        })

    } catch (error) {
        console.error('Get product error:', error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const query = 'SELECT * FROM products WHERE id = ?'
        
        // FIX 8: db.get uses callback, not return value!
        db.get(query, [id], (err, product) => {
            if (err) {
                console.error('Error fetching product:', err.message)
                return res.status(500).json({ message: "Internal Server Error" })
            }

            if (!product) {
                return res.status(404).json({ message: "Product not found" })
            }

            res.status(200).json({ data: product })
        })

    } catch (error) {
        console.error('Get product by ID error:', error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = { getProduct, getProductById }
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db/db')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', {expiresIn: '7d'})
}

const register = async (req, res) => {
    try {
        const {email, password, name, role = 'user'} = req.body 
        
        if(!email || !password || !name){
            return res.status(400).json({message: 'Email, password, name are required'})
        }

        // CRITICAL FIX 1: Check if user already exists first
        db.get('SELECT id FROM users WHERE email = ?', [email], async (err, existingUser) => {
            if (err) {
                console.error('Error checking user:', err.message);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            if (existingUser) {
                return res.status(409).json({ message: 'User already exists with this email' });
            }

            // CRITICAL FIX 2: Added AWAIT - bcrypt.hash is asynchronous!
            const hashedPassword = await bcrypt.hash(password, 10)

            // CRITICAL FIX 3: Fixed parameter order to match column order
            const query = 'INSERT INTO users(name, email, password, role) VALUES(?,?,?,?)'
            
            // CRITICAL FIX 4: db.run uses callback, not return value!
            db.run(query, [name, email, hashedPassword, role], function(err) {
                if(err){
                    console.error('Error creating user:', err.message);
                    return res.status(400).json({message: 'Not able to register', error: err.message})
                }

                // CRITICAL FIX 5: Use 'this.lastID' to get the inserted user ID
                const userId = this.lastID

                const token = generateToken({userId, role})

                // Return user data without password
                res.status(201).json({
                    message: 'Registered successfully', 
                    data: {
                        userId,
                        name,
                        email,
                        role
                    }, 
                    token 
                })
            })
        })

    } catch (error) {
        console.error('Error in register:', error);
        res.status(500).json({message: "Internal Server Error", error: error.message})
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body
     
        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"})
        }

        // CRITICAL FIX 6: Table name should be 'users' not 'user'
        // CRITICAL FIX 7: Use db.get() for SELECT, not db.run()!
        const userQuery = 'SELECT * FROM users WHERE email = ?'
        
        // CRITICAL FIX 8: db.get uses callback function!
        db.get(userQuery, [email], async (err, user) => {
            if(err){
                console.error('Error finding user:', err.message);
                return res.status(500).json({message: "Internal Server Error", error: err.message})
            }

            if(!user){
                return res.status(401).json({message: "Invalid email or password"})
            }

            // CRITICAL FIX 9: Added AWAIT - bcrypt.compare is asynchronous!
            const matchPassword = await bcrypt.compare(password, user.password)
            
            if(!matchPassword){
                return res.status(401).json({message: 'Invalid email or password'})
            }

            const token = generateToken({userId: user.id, role: user.role})

            // Don't send password in response
            res.status(200).json({
                message: 'Logged in successfully', 
                data: {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }, 
                token
            })
        })

    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({message: "Internal Server Error", error: error.message})
    }
}

module.exports = {register, login}
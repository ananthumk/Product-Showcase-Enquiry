const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const dbPath = process.env.DB_PATH || './database.sqlite'

//Database Connection
const db = new sqlite3.Database(dbPath, (err) => {
    if(err){
        console.log('Error opening database:', err.message)
    }else{
        console.log('Connected to SQLite database');
    }
})

//Enable Foreign Key
db.run('PRAGMA foreign_keys = ON')

module.exports = db
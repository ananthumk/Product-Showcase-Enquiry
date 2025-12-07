require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = process.env.DB_PATH || './database.sqlite';

// Remove existing database
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('Removed existing database');
}

// Create new database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error creating database:', err.message);
    process.exit(1);
  }
  console.log('Created new database');
});

// Read and execute schema
const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

db.serialize(() => {
  // Enable foreign keys
  db.run('PRAGMA foreign_keys = ON');

  // Execute schema
  db.exec(schema, (err) => {
    if (err) {
      console.error('Error creating schema:', err.message);
      process.exit(1);
    }
    console.log('Schema created successfully');

    // Execute seed data
    db.exec(seed, (err) => {
      if (err) {
        console.error('Error seeding data:', err.message);
        process.exit(1);
      }
      console.log('Database seeded successfully');

      // Verify data
      db.all('SELECT COUNT(*) as count FROM products', [], (err, rows) => {
        if (err) {
          console.error('Error verifying data:', err.message);
        } else {
          console.log(`Total products: ${rows[0].count}`);
        }

        db.close((err) => {
          if (err) {
            console.error('Error closing database:', err.message);
          }
          console.log('Database setup complete!');
        });
      });
    });
  });
});
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Using a connection pool for better handling of multiple simultaneous requests.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Optional: Test the pool by acquiring a connection.
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database through pool.');
    connection.release();  // Release the connection back to the pool.
});

module.exports = pool;

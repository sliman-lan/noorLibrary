const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// استخدم أسماء المتغيرات التي يقدمها Railway تلقائيًا
const db = mysql.createConnection({
  host: process.env.MYSQLHOST || 'localhost', // القيمة الافتراضية للتطوير المحلي
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'test',
  port: process.env.MYSQLPORT || 3306, // البورت الافتراضي لـ MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = db;

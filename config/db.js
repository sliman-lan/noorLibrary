const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: { rejectUnauthorized: false }  // إذا كانت خدمة Railway تتطلب SSL
});

db.connect((err) => {
    if (err) {
        console.error('فشل الاتصال بقاعدة البيانات:', err.stack);
        return;
    }
    console.log('تم الاتصال بقاعدة البيانات.');
});

module.exports = db;

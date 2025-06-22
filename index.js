const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// استدعاء المسارات مرة واحدة فقط
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');
const authRoutes = require('./routes/auth');
const publishersRoutes = require('./routes/publishers');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// تعريف المسارات
app.use('/api/auth', authRoutes);         // لتسجيل الدخول/التسجيل
app.use('/api/books', booksRoutes);       // قائمة الكتب / البحث / إضافة
app.use('/api/authors', authorsRoutes);   // المؤلفين
app.use('/api/publishers', publishersRoutes); // الناشرين

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

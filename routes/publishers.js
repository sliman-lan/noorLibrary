const express = require('express');
const db = require('../config/db'); // لتشغيل الاستعلام اليدوي
const Publisher = require('../models/Publisher');
const router = express.Router();

// ✅ إضافة ناشر
router.post('/', (req, res) => {
    const { pname, city } = req.body;
    Publisher.create(pname, city, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Publisher added successfully!' });
    });
});

// ✅ عرض جميع الناشرين
router.get('/', (req, res) => {
    Publisher.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(results);
    });
});

// ✅ البحث عن ناشر حسب الاسم وجلب كتبه
router.get('/with-books', (req, res) => {
  const namePart = req.query.name;
  if (!namePart) {
    return res.status(400).json({ message: 'اسم الناشر مطلوب' });
  }
  Publisher.searchWithBooks(namePart, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    
    // تجميع النتائج
    const grouped = {};
    results.forEach(row => {
      if (!grouped[row.PublisherId]) {
        grouped[row.PublisherId] = {
          name: row.pname,
          books: [],
        };
      }
      if (row.BookTitle) {
        grouped[row.PublisherId].books.push(row.BookTitle);
      }
    });

    res.json(Object.values(grouped));
  });
});
module.exports = router;

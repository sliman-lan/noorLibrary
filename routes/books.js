const express = require('express');
const Book = require('../models/Book'); // لاحظ التصغير هنا حس
const router = express.Router();

// ✅ إضافة كتاب
router.post('/', (req, res) => {
  const { title, type, price, pubId, AuthorId, Link} = req.body;
  Book.create(title, type, price, pubId, AuthorId, Link, (err, result) => {
    if (err) return res.status(500).json({ error: err.message || err });
    res.status(201).json({ message: 'Book added successfully!' });
  });
});

// عرض جميع الكتب
router.get('/', (req, res) => {
  Book.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message || err });
    console.log("✅ الكتب المرسلة:", results); // طباعة بيانات الكتب
    res.status(200).json(results);
  });
});

// البحث عن كتاب بعنوان جزئي
router.get('/search', (req, res) => {
  const titlePart = req.query.title;
  if (!titlePart) {
    return res.status(400).json({ message: 'Title part is required' });
  }
  Book.searchByTitle(titlePart, (err, results) => {
    if (err) return res.status(500).json({ error: err.message || err });
    res.status(200).json(results);
  });
});

// ✅ جلب تفاصيل كتاب كامل حسب العنوان (جديد)
router.get('/details/:title', (req, res) => {
  const title = req.params.title;
  Book.getByTitle(title, (err, book) => {
    if (err) return res.status(500).json({ error: err.message || err });
    if (!book) return res.status(404).json({ message: 'الكتاب غير موجود' });
    res.status(200).json(book);
  });
});

module.exports = router;
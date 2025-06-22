const express = require('express');
const Author = require('../models/Author');
const db = require('../config/db');
const router = express.Router();

// ✅ إضافة مؤلف
router.post('/', (req, res) => {
    const { fname, lname, country, city, address } = req.body;
    Author.create(fname, lname, country, city, address, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Author added successfully!' });
    });
});

// ✅ عرض جميع المؤلفين
router.get('/', (req, res) => {
    Author.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(results);
    });
});

// ✅ البحث باستخدام الاسم الأول أو الأخير
router.get('/search', (req, res) => {
    const namePart = req.query.name;
    if (!namePart) {
        return res.status(400).json({ message: 'الاسم مطلوب للبحث' });
    }

    Author.searchByName(namePart, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(results);
    });
});

// ✅ عرض المؤلفين مع الكتب المرتبطة بهم
router.get('/with-books', (req, res) => {
  const namePart = req.query.name || '';

  const sql = `
    SELECT 
      a.Id AS authorId,
      CONCAT(a.Fname, ' ', a.Lname) AS name,
      b.Title AS bookTitle
    FROM author a
    LEFT JOIN book b ON b.AuthorId = a.Id
    WHERE a.Fname LIKE ? OR a.Lname LIKE ?
  `;

  const likeQuery = `%${namePart}%`;

  db.query(sql, [likeQuery, likeQuery], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const grouped = {};
    results.forEach(row => {
      if (!grouped[row.authorId]) {
        grouped[row.authorId] = {
          name: row.name,
          books: [],
        };
      }
      if (row.bookTitle) {
        grouped[row.authorId].books.push(row.bookTitle);
      }
    });

    res.json(Object.values(grouped));
  });
});

module.exports = router;
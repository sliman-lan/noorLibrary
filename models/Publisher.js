const db = require('../config/db');

const Publisher = {
  create: (pname, city, callback) => {
    const sql = 'INSERT INTO publisher (pname, city) VALUES (?, ?)';
    db.query(sql, [pname, city], callback);
  },

  getAll: (callback) => {
    const sql = 'SELECT * FROM publisher';
    db.query(sql, callback);
  },

  // ✅ البحث عن ناشر حسب الاسم مع عرض الكتب التي نشرها
  searchWithBooks: (namePart, callback) => {
    const sql = `
      SELECT 
        publisher.Id AS PublisherId,
        publisher.pname AS pname,
        book.Title AS BookTitle
      FROM publisher
      LEFT JOIN book ON book.pubId = publisher.Id
      WHERE publisher.pname LIKE ?
    `;
    db.query(sql, [`%${namePart}%`], callback);
  }
};

module.exports = Publisher;
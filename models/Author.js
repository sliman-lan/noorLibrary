const db = require('../config/db');

const Author = {
  // 🔍 البحث عن مؤلفين مع كتبهم
  searchByName: (namePart, callback) => {
    const sql = `
      SELECT 
        author.id,
        author.Fname,
        author.Lname,
        COALESCE(
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', book.id,
              'Title', book.Title,
              'PublisherName', book.PublisherName,
              'Price', book.Price,
              'Link', book.Link,
              'AuthorFirstName', author.Fname,
              'AuthorLastName', author.Lname
            )
          ), JSON_ARRAY()
        ) AS books
      FROM author
      LEFT JOIN book ON author.id = book.author_id
      WHERE author.Fname LIKE ? OR author.Lname LIKE ?
      GROUP BY author.id;
    `;
    db.query(sql, [`%${namePart}%`, `%${namePart}%`], (err, results) => {
      if (err) return callback(err);

      const parsedResults = results.map(author => ({
        ...author,
        books: author.books ? JSON.parse(author.books) : [],
      }));

      callback(null, parsedResults);
    });
  },

  // ✅ إضافة الدالة المطلوبة فقط
  getAll: (callback) => {
    const sql = 'SELECT * FROM author';
    db.query(sql, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  // ✅ دالة create للمؤلف الجديد
  create: (fname, lname, country, city, address, callback) => {
    const sql = 'INSERT INTO author (Fname, Lname, Country, City, Address) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [fname, lname, country, city, address], callback);
  },
};

module.exports = Author;
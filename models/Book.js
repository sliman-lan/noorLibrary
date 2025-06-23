const db = require('../config/db');

const Book = {
  // إنشاء كتاب جديد
  create: (title, type, price, pubId, AuthorId, Link,callback) => {
    const sql = `
      INSERT INTO book (Title, Type, Price, pubId, AuthorId, Link)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [title, type, price, pubId, AuthorId, Link], callback);
  },

  // جلب جميع الكتب مع معلومات المؤلف والناشر
  getAll: (callback) => {
    const sql = `
      SELECT 
        book.Id AS BookId, 
        book.Title, 
        book.Type, 
        book.Price,
        book.Link,
        author.Fname AS AuthorFirstName,
        author.Lname AS AuthorLastName,
        Publisher.pname AS PublisherName
      FROM book
      JOIN author ON book.AuthorId = Author.Id
      JOIN publisher ON book.pubId = Publisher.Id
    `;
    db.query(sql, callback);
  },

  // البحث عن كتاب بعنوان جزئي
  searchByTitle: (titlePart, callback) => {
    const sql = `
      SELECT 
        book.Id AS BookId, 
        book.Title, 
        book.Type, 
        book.Price,
        book.Link,
        author.Fname AS AuthorFirstName,
        author.Lname AS AuthorLastName,
        publisher.pname AS PublisherName
      FROM book
      JOIN author ON book.AuthorId = Author.Id
      JOIN publisher ON book.pubId = Publisher.Id
      WHERE book.Title LIKE ?
    `;
    db.query(sql, [`%${titlePart}%`], callback);
  },

  // جلب تفاصيل كتاب واحد حسب العنوان (جديد)
  getByTitle: (title, callback) => {
    const sql = `
      SELECT 
        book.Id AS BookId, 
        book.Title, 
        book.Type, 
        book.Price,
        book.Link,
        author.Fname AS AuthorFirstName,
        author.Lname AS AuthorLastName,
        publisher.pname AS PublisherName
      FROM book
      JOIN author ON book.AuthorId = Author.Id
      JOIN publisher ON book.pubId = Publisher.Id
      WHERE book.Title = ?
      LIMIT 1
    `;
    db.query(sql, [title], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, null);
      callback(null, results[0]);
    });
  }
};

module.exports = Book;

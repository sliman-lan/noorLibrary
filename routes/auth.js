const express = require('express');
const User = require('../models/User');
const router = express.Router();

// ✅ تسجيل مستخدم جديد
router.post('/signup', (req, res) => {
  const { username, password, fname, lname } = req.body;

  console.log("📥 [POST /signup] طلب تسجيل مستخدم:", req.body);

  User.create(username, password, fname, lname, (err, result) => {
    if (err) {
      console.error("❌ خطأ أثناء إنشاء المستخدم:", err);
      return res.status(500).json({ error: "فشل في إنشاء المستخدم", details: err });
    }

    console.log("✅ تم إنشاء المستخدم بنجاح. ID:", result.insertId);
    res.status(201).json({ message: 'User created successfully!', id: result.insertId });
  });
});

// ✅ تسجيل الدخول
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log("🔑 [POST /login] محاولة تسجيل دخول:", req.body);

  // التحقق من وجود البيانات المطلوبة
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  User.findByUsername(username, (err, user) => {
    if (err) {
      console.error("❌ خطأ في findByUsername:", err);
      return res.status(500).json({ error: err });
    }

    if (!user) {
      console.warn("⚠️ اسم المستخدم غير موجود:", username);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    if (user.password !== password) {
      console.warn("⚠️ كلمة مرور غير صحيحة للمستخدم:", username);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    console.log("✅ تسجيل دخول ناجح للمستخدم:", username);
    return res.status(200).json({ message: 'Login successful!' });
  });
});

module.exports = router;
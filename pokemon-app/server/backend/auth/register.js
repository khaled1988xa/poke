const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db'); // Your database connection
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'User registration failed!', error });
  }
});

module.exports = router;

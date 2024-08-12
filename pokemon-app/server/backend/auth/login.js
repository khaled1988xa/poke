const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db'); // Your database connection
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password!' });
    }

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid username or password!' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed!', error });
  }
});

module.exports = router;

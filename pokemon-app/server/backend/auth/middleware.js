const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Failed to authenticate token!', error });
  }
}

module.exports = authMiddleware;

const csrf = require('csrf');
const tokens = new csrf();

const csrfMiddleware = (req, res, next) => {
  // Create CSRF token
  if (!req.session.csrfSecret) {
    req.session.csrfSecret = tokens.secretSync();
  }

  // Add token to response header
  const token = tokens.create(req.session.csrfSecret);
  res.cookie('XSRF-TOKEN', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  // Verify token in POST, PUT, DELETE requests
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const token = req.headers['x-xsrf-token'];
    if (!token || !tokens.verify(req.session.csrfSecret, token)) {
      return res.status(403).json({ message: 'CSRF token geçersiz' });
    }
  }

  next();
};

module.exports = csrfMiddleware; 
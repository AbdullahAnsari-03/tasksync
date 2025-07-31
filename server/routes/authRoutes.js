// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth');
const { registerUser, loginUser } = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', registerUser);

// POST /api/auth/login
router.post('/login', loginUser); 

// Protected route (for testing)
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
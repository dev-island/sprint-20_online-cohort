const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { verifyBody } = require('../middleware/auth.middleware');

router.post('/login', verifyBody, authController.handleLogin);
router.post('/register', verifyBody, authController.handleRegister);
router.delete('/logout', authController.handleLogout);

module.exports = router;
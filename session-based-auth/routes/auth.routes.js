const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { verifyBody } = require('../middleware/auth.middleware');

router.post('/login', verifyBody, authController.login);
router.post('/register', verifyBody, authController.register);
router.delete('/logout', authController.logout);

module.exports = router;
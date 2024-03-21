const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const verifyBody = require("../middleware/verifyBody");

router.post("/login", verifyBody, authController.login);
router.post("/register", verifyBody, authController.register);

module.exports = router;

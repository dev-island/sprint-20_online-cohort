const router = require('express').Router();

router.get('/:id', userController.getUser);

module.exports = router;
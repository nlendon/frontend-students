const Router = require("express");
const authController = require("../Controllers/AuthController");

const router = new Router();

router.post('/login', authController.login)
router.post('/token', authController.getToken);

module.exports = router

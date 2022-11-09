const Router = require("express");
const userController = require("../Controllers/UserController");

const router = new Router();

router.post('/information', userController.create);
router.get('/info', userController.get);
router.put('/information/update/:id', userController.update);
router.delete('/information/delete/:id', userController.delete);
router.get('/export', userController.exportUser);

module.exports = router
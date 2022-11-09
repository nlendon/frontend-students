const Router = require("express");
const router = new Router();

const authRouter = require("./authRoutes");
const studentRoutes = require('./studentRoutes')

router.use('/auth', authRouter);
router.use('/student', studentRoutes)

module.exports = router

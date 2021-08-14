const router = require('express').Router();
const userRouter = require('./user')
const pelayananRouter = require(`./pelayanan`)
const keuanganRouter = require(`./keuangan`)

router.use("/user", userRouter)

router.use(`/pelayanan`, pelayananRouter)

router.use(`/keuangan`, keuanganRouter)

module.exports = router;

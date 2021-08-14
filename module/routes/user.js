
const router = require('express').Router();
const { getUser, loginUser } = require("../controller/user")


/* GET users listing. */
router.get('/', getUser);

router.post('/login', loginUser)

module.exports = router;

const router = require('express').Router();
const { 
    trendPendapatan,
    pendapatan,
    pendapatanCaraBayar,
    pendapatanPerUnit,
    pendapatanPerJenis
    } = require("../controller/keuangan");

// initializing Middleware
const { checkAuthorization } = require('../middleware');


// API
router.get('/trendPendapatan', checkAuthorization, trendPendapatan);

router.get('/pendapatan', checkAuthorization, pendapatan);

router.get('/pendapatanCaraBayar', checkAuthorization, pendapatanCaraBayar);

router.get('/pendapatanPerUnit', checkAuthorization, pendapatanPerUnit);

router.get('/pendapatanPerJenis', checkAuthorization, pendapatanPerJenis);


module.exports = router;

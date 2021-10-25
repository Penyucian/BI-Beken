const router = require('express').Router();
const {
    trendPendapatan,
    pendapatan,
    pendapatanCaraBayar,
    pendapatanPerUnit,
    pendapatanPerJenis,
    pendapatanPerPenunjang,
    pendapatanPerRanap,
    pendapatanPerCaraBayar,
    klaimStatus
} = require("../controller/keuangan");

// initializing Middleware
const { checkAuthorization } = require('../middleware');


// API
router.post('/trendPendapatan', checkAuthorization, trendPendapatan);

router.post('/pendapatan', checkAuthorization, pendapatan);

router.post('/pendapatanCaraBayar', checkAuthorization, pendapatanCaraBayar);

router.post('/pendapatanPerUnit', checkAuthorization, pendapatanPerUnit);

router.post('/pendapatanPerJenis', checkAuthorization, pendapatanPerJenis);

router.post('/pendapatanPerPenunjang', checkAuthorization, pendapatanPerPenunjang);

router.post('/pendapatanPerRanap', checkAuthorization, pendapatanPerRanap);

router.post('/pendapatanPerCaraBayar', checkAuthorization, pendapatanPerCaraBayar);

router.post('/klaimStatus', checkAuthorization, klaimStatus);


module.exports = router;

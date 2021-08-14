const router = require('express').Router();
const { 
    trendMasukRumahSakit,
    kunjungan,
    ketersediaanBedNonCovid,
    ketersediaanBedCovid,
    sepuluhBesarRajal,
    sepuluhBesarRanap,
    stateCovid,
    kunjunganRJ,
    kunjunganRI,
    kunjunganCaraBayar,
    kunjunganKecamatan,
    penggunaanObatTertinggi,
    stockObat,
    kunjunganDanPengunjung,
    } = require("../controller/pelayanan");

// initializing Middleware
const { checkAuthorization } = require('../middleware');


// API
router.get('/trendMasukRumahSakit', checkAuthorization, trendMasukRumahSakit);

router.get('/kunjungan', checkAuthorization, kunjungan);

router.get('/ketersediaanBedNonCovid', checkAuthorization, ketersediaanBedNonCovid);

router.get('/ketersediaanBedCovid', checkAuthorization, ketersediaanBedCovid);

router.get('/stateCovid', checkAuthorization, stateCovid);

router.get('/sepuluhBesarRajal', checkAuthorization, sepuluhBesarRajal);

router.get('/sepuluhBesarRanap', checkAuthorization, sepuluhBesarRanap);

router.get('/penggunaanObatTertinggi', checkAuthorization, penggunaanObatTertinggi);

router.get('/stockObat', checkAuthorization, stockObat);

router.get('/kunjunganDanPengunjung', checkAuthorization, kunjunganDanPengunjung);

router.get('/kunjunganRJ', checkAuthorization, kunjunganRJ);

router.get('/kunjunganRI', checkAuthorization, kunjunganRI);

router.get('/kunjunganCaraBayar', checkAuthorization, kunjunganCaraBayar);

router.get('/kunjunganKecamatan', checkAuthorization, kunjunganKecamatan);

module.exports = router;

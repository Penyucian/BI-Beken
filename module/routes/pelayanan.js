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
    barberJohnson,
} = require("../controller/pelayanan");

// initializing Middleware
const { checkAuthorization } = require('../middleware');


// API
router.post('/trendMasukRumahSakit', checkAuthorization, trendMasukRumahSakit);

router.post('/kunjungan', checkAuthorization, kunjungan);

router.post('/ketersediaanBedNonCovid', checkAuthorization, ketersediaanBedNonCovid);

router.post('/ketersediaanBedCovid', checkAuthorization, ketersediaanBedCovid);

router.post('/stateCovid', checkAuthorization, stateCovid);

router.post('/sepuluhBesarRajal', checkAuthorization, sepuluhBesarRajal);

router.post('/sepuluhBesarRanap', checkAuthorization, sepuluhBesarRanap);

router.post('/penggunaanObatTertinggi', checkAuthorization, penggunaanObatTertinggi);

router.post('/stockObat', checkAuthorization, stockObat);

router.post('/kunjunganDanPengunjung', checkAuthorization, kunjunganDanPengunjung);

router.post('/kunjunganRJ', checkAuthorization, kunjunganRJ);

router.post('/kunjunganRI', checkAuthorization, kunjunganRI);

router.post('/kunjunganCaraBayar', checkAuthorization, kunjunganCaraBayar);

router.post('/kunjunganKecamatan', checkAuthorization, kunjunganKecamatan);

router.post('/kunjunganKecamatan', checkAuthorization, kunjunganKecamatan);

router.post('/barberJohnson', checkAuthorization, barberJohnson);

module.exports = router;

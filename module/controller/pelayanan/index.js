require("dotenv").config()
const db = require("../../../tools/database");
const now = new Date().getDate()

let arrayContainData
let where_1
let limit
let totalDate

/* TRENDMASUKRS */
const trendMasukRumahSakit = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const separator = req.body.limit

    const finalYearFirst = new Date(dateFirst)
    const finalYearLast = new Date(dateLast)
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))

    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'BETWEEN ? AND ?'
            arrayContainData = [finalYearFirst, finalYearLast]

        } else if (timeDiff === 0) {

            where_1 = '= ?'
            arrayContainData = [finalYearLast]

        } else {

            where_1 = '= ?'
            arrayContainData = [finalYearLast]

        }

        const [kunjunganRJ] = await db.query(`
            SELECT 
                Year(v.date) as year,
                MONTH(v.date) as bulan,
                COUNT(v.id) as jml
            FROM 
                visits v 
                JOIN ref_clinics rc ON (rc.id = v.clinic_id)
            WHERE rc.type IN ("rawat jalan")
                AND v.continue_id not in(10)
                AND YEAR(v.date) ${where_1}
            GROUP BY YEAR(v.date), MONTH(v.date)
            ${limit}
            `, arrayContainData)

        const [kunjunganRI] = await db.query(`
            SELECT 
                Year(vic.entry_date) as year,
                MONTH(vic.entry_date) as bulan,
                COUNT(vic.inpatient_clinic_id) as jml
            FROM 
                visits_inpatient_clinic vic
                left join ref_inpatient_clinics ric on vic.inpatient_clinic_id = ric.id
            WHERE 1 AND YEAR(vic.entry_date) ${where_1}
            GROUP BY YEAR(vic.entry_date), MONTH(vic.entry_date)
            ${limit}
            `, arrayContainData)


        res.json({
            "success": true,
            "kunjunganRJ": kunjunganRJ,
            "kunjunganRI": kunjunganRI
        })
    } catch (error) {
        next(error)
    }
}

/* Kunjungan total & rata-rata */
const kunjungan = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))

    try {

        if (timeDiff > 0) {

            where_1 = 'DATE(v.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast]
            totalDate = timeDiff

        } else if (timeDiff === 0) {

            where_1 = 'DATE(v.date) = ?'
            arrayContainData = [dateLast]
            totalDate = dateLastDate

        } else {

            where_1 = 'MONTH(v.date) = ?'
            arrayContainData = [dateLastMonth]
            totalDate = dateLastDate

        }

        const [kunjungan] = await db.query(`
            SELECT 
                COUNT(v.id) as jml
            FROM 
                visits v 
                JOIN ref_clinics rc ON (rc.id = v.clinic_id)
            WHERE ${where_1}
                AND rc.type IN ("rawat jalan")
                AND v.continue_id not in(10)
            group by month(v.date)
            `, arrayContainData)

        const kunjunganTotal = kunjungan[0].jml
        const kunjunganAVG = Math.ceil(kunjunganTotal / totalDate)

        res.json({
            "success": true,
            "kunjungan": kunjunganTotal,
            "kunjunganAVG": kunjunganAVG,
        })

    } catch (error) {
        next(error)
    }
}

/* Kunjungan dan pengunjung */
const kunjunganDanPengunjung = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))

    try {

        if (timeDiff > 0) {

            where_1 = 'DATE(v.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast]

        } else if (dateLast === dateFirst) {

            where_1 = 'DATE(v.date) = ?'
            arrayContainData = [dateLast]

        } else {

            where_1 = 'MONTH(v.date) = ?'
            arrayContainData = [dateLastMonth]

        }

        const [kunjunganBL] = await db.query(`
            SELECT
                v.jenis_kunjungan,
                COUNT(v.id) as jumlah
            FROM
                visits v
            WHERE
                v.continue_id not in(10)
                AND ${where_1}
            GROUP BY v.jenis_kunjungan
            `, arrayContainData)

        const [kunjunganLP] = await db.query(`
            SELECT
                p.sex,
                COUNT(p.sex) as jumlah
            FROM
                visits v
            JOIN patients p ON v.patient_id = p.id 
            WHERE
                v.continue_id not in(10)
                AND ${where_1}
            GROUP BY p.sex 
            `, arrayContainData)

        const [pengunjungBL] = await db.query(`
            SELECT
                total.jenis_kunjungan,
                COUNT(total.jumlah) as jumlah 
            FROM
                (
                SELECT
                    v.jenis_kunjungan,
                    count(v.patient_id) as jumlah
                FROM
                    visits v
                JOIN patients p ON
                    v.patient_id = p.id
                WHERE
                    v.continue_id not in(10)
                    AND ${where_1}
                GROUP BY
                    v.patient_id ) as total
            GROUP BY
                total.jenis_kunjungan
            `, arrayContainData)

        res.json({
            "success": true,
            "kunjunganBL": kunjunganBL,
            "kunjunganLP": kunjunganLP,
            "pengunjungBL": pengunjungBL
        })


    } catch (error) {
        next(error)
    }
}

/* sepuluhBesarRajal */
const sepuluhBesarRajal = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))


    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(v.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast]

        } else if (timeDiff === 0) {

            where_1 = 'DATE(v.date) = ?'
            arrayContainData = [dateLast]

        } else {

            where_1 = 'MONTH(v.date) = ?'
            arrayContainData = [dateLastMonth]

        }
        const [rows] = await db.query(`
            SELECT 
                ad.icd_code,
                ad.icd_name,
                COUNT(ad.icd_code) as jml
            FROM 
                anamnese_diagnoses ad
                JOIN visits v ON (v.id = ad.visit_id)
                JOIN patients p ON (p.id = v.patient_id)
            WHERE ${where_1}
            GROUP BY ad.icd_code
            ORDER BY jml DESC, name
            ${limit}
            `, arrayContainData)

        res.json({
            "success": true,
            "result": rows
        })

    } catch (error) {
        next(error)
    }
}

/* sepuluhBesarRanap */
const sepuluhBesarRanap = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))


    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(v.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast]

        } else if (timeDiff === 0) {

            where_1 = 'DATE(v.date) = ?'
            arrayContainData = [dateLast]

        } else {
            where_1 = 'MONTH(v.date) = ?'
            arrayContainData = [dateLastMonth]

        }

        const [rows] = await db.query(`
            SELECT 
                ad.icd_code,
                ad.icd_name,
                COUNT(ad.icd_code) as jml
            FROM 
                anamnese_diagnoses ad
                JOIN visits_inpatient vi ON (vi.id = ad.visit_inpatient_id)
                JOIN visits v ON (v.id = vi.visit_id)
                JOIN patients p ON (p.id = vi.patient_id)
            WHERE ${where_1}
            GROUP BY ad.icd_code
            ORDER BY jml DESC, name
            ${limit}
            `, arrayContainData)

        res.json({
            "success": true,
            "result": rows
        })

    } catch (error) {
        next(error)
    }
}

/* Kunjungan RJ */
const kunjunganRJ = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))


    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(v.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast]

        } else if (timeDiff === 0) {

            where_1 = 'DATE(v.date) = ?'
            arrayContainData = [dateLast]

        } else {
            where_1 = 'MONTH(v.date) = ?'
            arrayContainData = [dateLastMonth]

        }
        const [rows] = await db.query(`
            SELECT 
                rc.name as label,
                COUNT(v.id) as jml
            FROM 
                visits v 
                JOIN ref_clinics rc ON (rc.id = v.clinic_id)
            WHERE ${where_1}
                AND rc.type IN ("rawat jalan")
            GROUP BY rc.id
            ORDER BY jml DESC, name
            ${limit}
            `, arrayContainData)

        res.json({
            "success": true,
            "result": rows
        })

    } catch (error) {
        next(error)
    }
}

/* Kunjungan RI */
const kunjunganRI = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))


    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(vic.entry_date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast]

        } else if (timeDiff === 0) {

            where_1 = 'DATE(vic.entry_date) = ?'
            arrayContainData = [dateLast]
            totalDate = dateLastDate


        } else {

            where_1 = 'MONTH(vic.entry_date) = ?'
            arrayContainData = [dateLastMonth]

        }

        const [rows] = await db.query(`
            SELECT 
                ric.name as label,
                COUNT(vic.inpatient_clinic_id) as jml
            FROM 
                visits_inpatient_clinic vic
                left join ref_inpatient_clinics ric on vic.inpatient_clinic_id = ric.id
            WHERE ${where_1}
            GROUP BY ric.name
            ORDER BY jml DESC, name
            ${limit}
            `, arrayContainData)

        res.json({
            "success": true,
            "result": rows
        })


    } catch (error) {
        next(error)
    }
}

/* kunjungan Cara Bayar */
const kunjunganCaraBayar = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))


    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(v.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast]

        } else if (timeDiff === 0) {

            where_1 = 'DATE(v.date) = ?'
            arrayContainData = [dateLast]
            totalDate = dateLastDate

        } else {

            where_1 = 'MONTH(v.date) = ?'
            arrayContainData = [dateLastMonth]

        }

        const [rows] = await db.query(`
            SELECT 
                r.name as label,
                COUNT(v.payment_type_id) as total
            FROM 
                visits v
                JOIN ref_payment_types r ON (r.id = v.payment_type_id)
            WHERE ${where_1}
            AND v.continue_id not in(10)
            GROUP BY label 
            ORDER BY total desc
            ${limit}
            `, arrayContainData)

        res.json({
            "success": true,
            "result": rows
        })

    } catch (error) {
        next(error)
    }
}

/* kunjungan Kecamatan */
const kunjunganKecamatan = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))


    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(v.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast]

        } else if (timeDiff === 0) {

            where_1 = 'DATE(v.date) = ?'
            arrayContainData = [dateLast]

        } else {

            where_1 = 'MONTH(v.date) = ?'
            arrayContainData = [dateLastMonth]

        }

        const [rows] = await db.query(`
            SELECT 
                rsd.name as label,
                COUNT(v.sub_district_id) as jml
            FROM 
                visits v
                left join ref_sub_districts rsd on v.sub_district_id = rsd.id 
            WHERE ${where_1}
            GROUP BY rsd.name 
            ORDER BY jml DESC, name
            ${limit}
            `, arrayContainData)

        res.json({
            "success": true,
            "result": rows
        })

    } catch (error) {
        next(error)
    }
}


/* penggunaanObatTertinggi */
const penggunaanObatTertinggi = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))


    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(pr.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast]

        } else if (timeDiff === 0) {

            where_1 = 'DATE(pr.date) = ?'
            arrayContainData = [dateLast]
            totalDate = dateLastDate

        } else {

            where_1 = 'MONTH(pr.date) = ?'
            arrayContainData = [dateLastMonth]

        }

        const [rows] = await db.query(`
            SELECT
                prd.drug_code,
                prd.drug_name,
                COUNT(prd.jumlah) as total
            FROM
                prescriptions pr
            JOIN prescriptions_detail prd ON
                (prd.prescription_id = pr.id)
            JOIN ref_drugs rd ON
                (rd.code = prd.drug_code)
            WHERE
                pr.visit_inpatient_id IS NULL
                AND ${where_1}
            GROUP BY
                prd.drug_code
            ORDER BY total DESC, prd.drug_name
            ${limit}
            `, arrayContainData)

        res.json({
            "success": true,
            "data": rows
        })

    } catch (error) {
        next(error)
    }
}

/* stock obat */
const stockObat = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))


    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(dt.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast]

        } else if (timeDiff === 0) {

            where_1 = 'DATE(dt.date) <= ?'
            arrayContainData = [dateLast]
            totalDate = dateLastDate

        } else {

            where_1 = 'MONTH(dt.date) <= ?'
            arrayContainData = [dateLastMonth]

        }

        const [rows] = await db.query(`
            SELECT
                dtd.drug_code,
                rd.name,
                rd.formularium,
                rdg.name as generik,
                SUM(dtd.jumlah) as jumlah
            FROM
                drugs_transaction dt
            JOIN drugs_transaction_detail dtd ON
                (dtd.drug_transaction_id = dt.id)
            JOIN ref_drugs rd on
                dtd.drug_code = rd.code
            left JOIN ref_drugs_group rdg on
                rdg.id = rd.drug_group_id
            WHERE ${where_1}
            GROUP BY
                dtd.drug_code
            ORDER BY
                jumlah desc
            ${limit}
            `, arrayContainData)

        res.json({
            "success": true,
            "result": rows
        })

    } catch (error) {
        next(error)
    }
}

/* stateCovid */
const stateCovid = async (req, res, next) => {

    const dateLast = req.body.dateLast
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)

    try {

        const [stateCovid] = await db.query(`
            SELECT
                vi.covid19_status,
                COUNT(vi.covid19_status) as totalAwal
            FROM
                visits_inpatient vi
            where
                vi.covid19_status is not null
                AND DATE(vi.exit_date) is null
                AND MONTH(vi.entry_date) = ?
                AND covid19_status in("Konfirmasi")
            GROUP BY
                vi.covid19_status
            `, [dateLastMonth])

        if (stateCovid.length == 0) {
            res.json({
                "success": true,
                "data": 0
            })
        } else {
            res.json({
                "success": true,
                "data": stateCovid
            })
        }

    } catch (error) {
        next(error)
    }
}

/* ketersediaanBedNonCovid */
const ketersediaanBedNonCovid = async (req, res, next) => {
    try {
        const totalBed = await db.query(`
            SELECT
                rk.id as kelas_id,
                rk.name,
                SUM(ric.bed) as kapasitas,
                SUM(ric.bed) as tersedia
            FROM ref_inpatient_clinics ric
                JOIN ref_kelas rk ON (rk.id = ric.kelas_id)
            WHERE ric.tahun_akhir IS NULL AND ric.active='1' AND ric.is_covid19 = "0"
            GROUP BY rk.id, rk.name
        `)

        const total = totalBed[0]

        const tersediaBed = await db.query(`
            SELECT
                ric.kelas_id,
                COUNT(*) as jml
            FROM visits_inpatient_clinic vic
                JOIN ref_inpatient_clinics ric ON (ric.id = vic.inpatient_clinic_id)
            WHERE vic.exit_date IS NULL 
                AND vic.inpatient_clinic_id IS NOT NULL and ric.is_covid19 = "0"
            GROUP BY ric.kelas_id
        `)

        const terpakai = tersediaBed[0]

        try {
            total.forEach(x => {
                x.kapasitas = parseInt(x.kapasitas)
                x.tersedia = parseInt(x.tersedia)
                terpakai.forEach(y => {
                    if (x.kelas_id == y.kelas_id) {
                        x.tersedia = x.kapasitas - y.jml
                        x.tersedia = ((x.tersedia < 0) ? 0 : x.tersedia)
                    }
                })
            });

            const final = total.reduce((prev, cur) => prev + cur.tersedia, 0);
            res.json({
                "success": true,
                "semuaBedTersedia": final,
                "perKelas": total
            })
        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}

/* ketersediaanBedCovid */
const ketersediaanBedCovid = async (req, res, next) => {
    try {

        const totalBed = await db.query(`
            SELECT
                rk.id as kelas_id,
                rk.name,
                SUM(ric.bed) as kapasitas,
                SUM(ric.bed) as tersedia
            FROM ref_inpatient_clinics ric
                JOIN ref_kelas rk ON (rk.id = ric.kelas_id)
            WHERE ric.tahun_akhir IS NULL AND ric.active='1' AND ric.is_covid19 = "1"
            GROUP BY rk.id, rk.name
        `)

        const total = totalBed[0]

        const tersediaBed = await db.query(`
            SELECT
                ric.kelas_id,
                COUNT(*) as jml
            FROM visits_inpatient_clinic vic
                JOIN ref_inpatient_clinics ric ON (ric.id = vic.inpatient_clinic_id)
            WHERE vic.exit_date IS NULL 
                AND vic.inpatient_clinic_id IS NOT NULL and ric.is_covid19 = "1"
            GROUP BY ric.kelas_id
        `)

        const terpakai = tersediaBed[0]

        try {
            total.forEach(x => {
                x.kapasitas = parseInt(x.kapasitas)
                x.tersedia = parseInt(x.tersedia)
                terpakai.forEach(y => {
                    if (x.kelas_id == y.kelas_id) {
                        x.tersedia = x.kapasitas - y.jml
                        x.tersedia = ((x.tersedia < 0) ? 0 : x.tersedia)
                    }
                })
            });

            const final = total.reduce((prev, cur) => prev + cur.tersedia, 0);
            res.json({
                "success": true,
                "semuaBedTersedia": final,
                "perKelas": total
            })
        } catch (error) {
            next(error)
        }
    } catch (error) {
        next(error)
    }
}

/* barber Johnson */
const barberJohnson = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast

    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const dateLastYear = dateLast.substring(0, 4)

    try {
        const [keluarHidupPulang] = await db.query(`
            SELECT 
                COUNT(vic.id) as jml
            FROM 
                visits_inpatient vi
                JOIN visits_inpatient_clinic vic ON (vic.visit_inpatient_id = vi.id)
            WHERE 
                DATE(vic.exit_date) BETWEEN ? AND ?
                AND 
                (vi.inpatient_exit_condition_id NOT IN (4,5)
                OR vi.inpatient_exit_condition_id IS NULL)
                AND vic.inpatient_clinic_tujuan_id IS NULL
                `, [`
                    ${dateLastYear}-${dateLastMonth}-01`,
        `${dateLastYear}-${dateLastMonth}-${dateLastDate}`
        ])

        const [keluarDipindahkan] = await db.query(`
            SELECT 
                COUNT(vic.id) as jml
            FROM 
                visits_inpatient vi
                JOIN visits_inpatient_clinic vic ON (vic.visit_inpatient_id = vi.id AND vic.inpatient_clinic_tujuan_id IS NOT NULL)
            WHERE 
                DATE(vic.exit_date) BETWEEN ? AND ?
                `, [`
                    ${dateLastYear}-${dateLastMonth}-01`,
        `${dateLastYear}-${dateLastMonth}-${dateLastDate}`
        ])

        const [pasienKeluarMatiKurangDari] = await db.query(`
            SELECT 
                COUNT(vi.id) as jml
            FROM 
                visits_inpatient vi
                JOIN visits_inpatient_clinic vic ON (vic.visit_inpatient_id = vi.id)
            WHERE 
                DATE(vi.exit_date) BETWEEN ? AND ?
                AND vic.inpatient_clinic_tujuan_id IS NULL
                AND vi.inpatient_exit_condition_id IN (4)
                `, [`
                    ${dateLastYear}-${dateLastMonth}-01`,
        `${dateLastYear}-${dateLastMonth}-${dateLastDate}`
        ])

        const [pasienKeluarMatiLebihDari] = await db.query(`
            SELECT 
                COUNT(vi.id) as jml
            FROM 
                visits_inpatient vi
                JOIN visits_inpatient_clinic vic ON (vic.visit_inpatient_id = vi.id)
            WHERE 
                DATE(vi.exit_date) BETWEEN ? AND ?
                AND vic.inpatient_clinic_tujuan_id IS NULL
                AND vi.inpatient_exit_condition_id IN (5)
                `, [`
                    ${dateLastYear}-${dateLastMonth}-01`,
        `${dateLastYear}-${dateLastMonth}-${dateLastDate}`
        ])

        const [lamaDirawat] = await db.query(`
            SELECT 
                SUM(vic.lama_dirawat) AS lama_dirawat
            FROM 
                visits_inpatient_clinic vic
                JOIN visits_inpatient vi ON (vi.id = vic.visit_inpatient_id)
            WHERE 
                DATE(vic.exit_date) BETWEEN ? AND ?
                `, [`
                    ${dateLastYear}-${dateLastMonth}-01`,
        `${dateLastYear}-${dateLastMonth}-${dateLastDate}`
        ])

        const [jumlahTT] = await db.query(`
            SELECT 
                SUM(bed) as jml
            FROM 
                ref_inpatient_clinics
            WHERE 1
                AND tahun_awal<=?
                AND (tahun_akhir>=? OR tahun_akhir IS NULL)
                AND active='1'
            `, [`
                ${dateLastYear}-${dateLastMonth}-01`,
        `${dateLastYear}-${dateLastMonth}-${dateLastDate}`
        ])

        let z = 0

        for (let x = 1; x <= dateLastDate; x++) {

            const [hariPerawatan] = await db.query(`
            SELECT 
                COUNT(vic.id) as hari_perawatan
            FROM 
                visits_inpatient_clinic vic
                JOIN visits_inpatient vi ON (vi.id = vic.visit_inpatient_id)
            WHERE 
                1
                AND (
                (DATE(vic.entry_date) <= ? AND (DATE(vic.exit_date) > ? OR vic.exit_date IS NULL))
                OR 
                (DATE(vic.entry_date) = ? AND DATE(vic.exit_date) = DATE(vic.entry_date))
                )
            `, [`
                ${dateLastYear}-${dateLastMonth}-${x}`,
            `${dateLastYear}-${dateLastMonth}-${x}`,
            `${dateLastYear}-${dateLastMonth}-${x}`
            ])
            z += hariPerawatan[0].hari_perawatan
        }

        const matilebih = pasienKeluarMatiLebihDari[0].jml
        const matikurang = pasienKeluarMatiKurangDari[0].jml
        const pasienKeluarHidup = keluarHidupPulang[0].jml
        const pasienKeluarDipindahkan = keluarDipindahkan[0].jml
        const jmlTT = jumlahTT[0].jml
        const lamaDirawat2 = lamaDirawat[0].lama_dirawat
        const jmlPasienKeluar = (pasienKeluarHidup + pasienKeluarDipindahkan + matikurang + matilebih)
        const jmlPasienpulang = (pasienKeluarHidup + matilebih + matikurang)

        const bor = (z / (jmlTT * dateLastDate) * 100).toFixed(2)
        const avlos = (lamaDirawat2 / jmlPasienKeluar).toFixed(2)
        const ndr = (pasienKeluarMatiLebihDari[0].jml / jmlPasienpulang * 1000).toFixed(2)
        const gdr = ((matilebih + matikurang) / jmlPasienpulang * 1000).toFixed(2)
        const toi = (((jmlTT * dateLastDate) - z) / jmlPasienKeluar).toFixed(2)
        const bto = (jmlPasienKeluar / jmlTT).toFixed(2)

        let indikator

        if (60 <= bor >= 85) {
            indikator = "Pelayanan keadaan aman"
        } else {
            indikator = "Pelayanan kurang aman"
        }

        res.json({
            "success": true,
            "result": {
                "bor": bor,
                "ndr": ndr,
                "gdr": gdr,
                "avlos": avlos,
                "toi": toi,
                "bto": bto,
                "indikator": indikator
            }
        })


    } catch (error) {
        next(error)
    }
}

const pelayanController = {
    trendMasukRumahSakit,
    kunjungan,
    ketersediaanBedNonCovid,
    ketersediaanBedCovid,
    penggunaanObatTertinggi,
    stockObat,
    stateCovid,
    kunjunganDanPengunjung,
    sepuluhBesarRajal,
    sepuluhBesarRanap,
    kunjunganRJ,
    kunjunganRI,
    kunjunganCaraBayar,
    kunjunganKecamatan,
    barberJohnson,
}

module.exports = pelayanController
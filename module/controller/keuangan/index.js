require("dotenv").config()
const db = require("../../../tools/database");
const now = new Date().getDate()

let arrayContainData
let arrayContainData2 
let where_1
let where_2
let limit
let totalDate
let safetyTarget


/* Trend Pendapatan */
const trendPendapatan = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast

    const finalYearFirst = new Date(dateFirst)
    const finalYearLast = new Date(dateLast)
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))

    try {

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
        const [rows] = await db.query(`
        SELECT
            Year(k.date) as year,
            MONTH(k.date) as bulan,
            SUM(k.total) as total
        FROM
            kwitansi k
        LEFT JOIN ref_payment_types rpt ON
            k.payment_type_id = rpt.id
        WHERE
            YEAR(k.date) ${where_1}
            AND k.status NOT IN("BELUM BAYAR")
        GROUP BY
            MONTH(k.date)
        ORDER BY
            bulan ASC
        `,arrayContainData)

        res.json({
            "success": true,
            "result": rows
        })
    } catch (error) {
        next(error)
    }
}

/* Trend Pendapatan */
const klaimStatus = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast

    const finalYearFirst = new Date(dateFirst)
    const finalYearLast = new Date(dateLast)
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))

    try {

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
        const [rows] = await db.query(`
        SELECT
            Year(rks.date) as year,
            MONTH(rks.date) as bulan,
            rks.accept,
            rks.pending,
            rks.refuse
        FROM
            ref_klaim_status rks
        WHERE
            YEAR(rks.date) ${where_1}
        GROUP BY
            MONTH(rks.date)
        ORDER BY
            bulan ASC
        `,arrayContainData)

        res.json({
            "success": true,
            "result": rows
        })
    } catch (error) {
        next(error)
    }
}

/* Pendapatan Cara Bayar */
const pendapatanCaraBayar = async (req, res, next) => {

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
            where_2 = 'DATE(vi.entry_date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast, dateFirst, dateLast]
        } else if (timeDiff === 0) {
            where_1 = 'DATE(v.date) = ?'
            where_2 = 'DATE(vi.entry_date) = ?'
            arrayContainData = [dateLast, dateLast]
            totalDate = dateLastDate
        } else {
            where_1 = 'MONTH(v.date) = ?'
            where_2 = 'MONTH(vi.entry_date) = ?'
            arrayContainData = [dateLastMonth, dateLastMonth]
        }

        const [rows] = await db.query(`
        SELECT
            name1 as name,
            SUM(total1 + COALESCE(total2,0)) as final
        FROM (
            SELECT
                rpt.name as name1,
                COUNT(v.payment_type_id) as total1
            FROM
                visits v
            LEFT JOIN ref_payment_types rpt ON
                v.payment_type_id = rpt.id
            WHERE
                v.continue_id not IN(10) and ${where_1}
            GROUP BY
                v.payment_type_id
            ORDER BY
                rpt.name ) as v
        left JOIN (
            SELECT
                rpt.name as name2,
                COUNT(vi.payment_type_id)as total2
            FROM
                visits_inpatient vi
            LEFT JOIN ref_payment_types rpt ON
                vi.payment_type_id = rpt.id
            WHERE ${where_2}
            GROUP BY
                vi.payment_type_id
            ORDER BY
                rpt.name ) as vi ON
            v.name1 = vi.name2
	    GROUP BY v.name1
	    ORDER BY final desc
        `,arrayContainData)

        res.json({
            "success": true,
            "result": rows
        })

    } catch (error) {
        next(error)
    }
}

/* Pendapatan */
const pendapatan = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const dateLastYear = dateLast.substring(0, 4)
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))

    try {
        if (timeDiff > 0) {

            where_1 = 'DATE(k.date) BETWEEN ? AND ?'
            where_2 = 'tahun = ?'
            arrayContainData = [dateFirst, dateLast, dateLastYear]
            arrayContainData2 = [dateLastYear]
            totalDate = timeDiff

        } else if (timeDiff === 0) {

            where_1 = 'DATE(k.date) = ?'
            where_2 = 'tahun = ?'
            arrayContainData = [dateLast]
            arrayContainData2 = [dateLastYear]
            totalDate = dateLastDate

        } else {

            where_1 = 'MONTH(k.date) = ?'
            where_2 = 'tahun = ?'
            arrayContainData = [dateLastMonth]
            arrayContainData2 = [dateLastYear]
            totalDate = dateLastDate

        }
        const [rows] = await db.query(`
            SELECT
                rpt.name,
                SUM(total) as total
            FROM
                kwitansi k
                LEFT JOIN ref_payment_types rpt ON
                k.payment_type_id = rpt.id
            WHERE 
                ${where_1}
                AND k.status NOT IN("BELUM BAYAR")
            GROUP BY
                k.payment_type_id
            ORDER BY
                total DESC
            `,arrayContainData)

        const [targetTahun] = await db.query(`
            SELECT 
                tahun, total 
            FROM 
                ref_target_total rtt
            WHERE 
                ${where_2}
        `, arrayContainData2)

        const total = rows.map(item => 
            parseInt(item.total)
            ).reduce((prev, next) => 
                prev + next); 
        const totalavg = Math.ceil(total/totalDate)

        const target = targetTahun[0].total

        const persen = (x,y) => {
            return ((x/y)*100)
        }

        console.log(persen(total,target));

        if (persen(total,target) < 50) {
            safetyTarget = "Keuangan Rumah Sakit Sedang Tidak Aman"
        } else if (50 <= persen(total,target) && persen(total,target) < 100) {
            safetyTarget = "Keuangan Rumah Sakit Sedang Kurang Aman"
        } else if(persen(total,target) >= 100){
            safetyTarget = "Keuangan Rumah Sakit Aman"
        }

        res.json({
            "success": true,
            "total": total,
            "totalavg": totalavg,
            "targetTahun": targetTahun,
            "kondisi": safetyTarget
        })

    } catch (error)    {
        next(error)
    }
}

/* pendapatanPerUnit */
const pendapatanPerUnit = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const dateLastYear = dateLast.substring(0, 4)
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))

    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(k.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast, dateLastYear]
            totalDate = timeDiff

        } else if (timeDiff === 0) {

            where_1 = 'DATE(k.date) = ?'
            arrayContainData = [dateLast]
            totalDate = dateLastDate

        } else {

            where_1 = 'MONTH(k.date) = ?'
            arrayContainData = [dateLastMonth]
            totalDate = dateLastDate

        }
        
        const [rows] = await db.query(`
        SELECT
            rc.id,
            rc.name,
            SUM(kd.sub_total) AS pendapatan
        FROM
            kwitansi_detail kd
        JOIN kwitansi k ON
            (k.id = kd.kwitansi_id)
        JOIN ref_komponen_biaya_group rkbg ON
            (rkbg.id = kd.komponen_biaya_group_id)
        JOIN ref_clinics rc ON
            (rc.id = rkbg.clinic_id)
        WHERE
            k.jenis IN("RJ","IGD")
            and rkbg.clinic_id NOT IN(473,205)
            and ${where_1}
        GROUP BY
            rc.id,
            rc.name
        ORDER BY
            pendapatan desc
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

/* pendapatanPerPenunjang */
const pendapatanPerPenunjang = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const dateLastYear = dateLast.substring(0, 4)
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))

    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(k.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast, dateLastYear]
            totalDate = timeDiff

        } else if (timeDiff === 0) {

            where_1 = 'DATE(k.date) = ?'
            arrayContainData = [dateLast]
            totalDate = dateLastDate

        } else {

            where_1 = 'MONTH(k.date) = ?'
            arrayContainData = [dateLastMonth]
            totalDate = dateLastDate

        }
        
        const [rows] = await db.query(`
        SELECT
            rkbg.id,
            rkbg.name,
            SUM(kd.sub_total) AS pendapatan
        FROM
            kwitansi_detail kd
        JOIN kwitansi k ON
            (k.id = kd.kwitansi_id)
        left JOIN ref_komponen_biaya_group rkbg ON
            (rkbg.id = kd.komponen_biaya_group_id)
        left JOIN ref_clinics rc ON
            (rc.id = rkbg.clinic_id)
        WHERE
            ${where_1}
            AND rkbg.id IN(1, 3, 63, 5, 7, 73)
        GROUP BY
            rkbg.name
        ORDER BY
	        pendapatan desc
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

/* pendapatanPerRanap */
const pendapatanPerRanap = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const dateLastYear = dateLast.substring(0, 4)
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))

    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(k.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast, dateLastYear]
            totalDate = timeDiff

        } else if (timeDiff === 0) {

            where_1 = 'DATE(k.date) = ?'
            arrayContainData = [dateLast]
            totalDate = dateLastDate

        } else {

            where_1 = 'MONTH(k.date) = ?'
            arrayContainData = [dateLastMonth]
            totalDate = dateLastDate

        }
        
        const [rows] = await db.query(`
        SELECT
            ric.id,
            ric.name,
            SUM(kd.sub_total) AS pendapatan
        FROM
            kwitansi_detail kd
        JOIN kwitansi k ON
            (k.id = kd.kwitansi_id)
        left JOIN ref_komponen_biaya_group rkbg ON
            (rkbg.id = kd.komponen_biaya_group_id)
        left JOIN ref_inpatient_clinics ric ON
            (ric.id = kd.inpatient_clinic_id)
        WHERE 
            kd.inpatient_clinic_id IS NOT NULL
            AND ${where_1}
        GROUP BY 
            kd.inpatient_clinic_id 
        ORDER BY pendapatan desc
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

/* pendapatanPerJenis */
const pendapatanPerJenis = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const dateLastYear = dateLast.substring(0, 4)
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))

    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(k.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast, dateLastYear]
            totalDate = timeDiff

        } else if (timeDiff === 0) {

            where_1 = 'DATE(k.date) = ?'
            arrayContainData = [dateLast]
            totalDate = dateLastDate

        } else {

            where_1 = 'MONTH(k.date) = ?'
            arrayContainData = [dateLastMonth]
            totalDate = dateLastDate

        }

        const [rows] = await db.query(`
        SELECT
            k.jenis ,
            SUM(kd.sub_total) AS pendapatan
        FROM
            kwitansi_detail kd
        JOIN kwitansi k ON
            (k.id = kd.kwitansi_id)
        JOIN ref_komponen_biaya_group rkbg ON
            (rkbg.id = kd.komponen_biaya_group_id)
        WHERE ${where_1}
        GROUP by
            k.jenis
        ORDER BY pendapatan DESC 
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

/* pendapatanPerCaraBayar */
const pendapatanPerCaraBayar = async (req, res, next) => {

    const dateFirst = req.body.dateFirst
    const dateLast = req.body.dateLast
    const separator = req.body.limit

    const finalYearFirst = (new Date(dateFirst))
    const finalYearLast = (new Date(dateLast))
    const dateLastDate = dateLast.substring(8, 10)
    const dateLastMonth = dateLast.substring(5, 7)
    const dateLastYear = dateLast.substring(0, 4)
    const timeDiff = ((finalYearLast.getTime() - finalYearFirst.getTime()) / (1000 * 60 * 60 * 24))

    try {

        if (separator !== (null || undefined)) {
            limit = `limit ${separator}`
        } else {
            limit = ``
        }

        if (timeDiff > 0) {

            where_1 = 'DATE(k.date) BETWEEN ? AND ?'
            arrayContainData = [dateFirst, dateLast, dateLastYear]
            totalDate = timeDiff

        } else if (timeDiff === 0) {

            where_1 = 'DATE(k.date) = ?'
            arrayContainData = [dateLast]
            totalDate = dateLastDate

        } else {

            where_1 = 'MONTH(k.date) = ?'
            arrayContainData = [dateLastMonth]
            totalDate = dateLastDate

        }
        
        const [rows] = await db.query(`
        SELECT
            k.payment_type_id as id,
            rpt.name,
            SUM(kd.sub_total) AS pendapatan
        FROM
            kwitansi_detail kd
        JOIN kwitansi k ON
            (k.id = kd.kwitansi_id)
        LEFT JOIN ref_payment_types rpt ON
            (rpt.id = k.payment_type_id)
        WHERE
            kd.inpatient_clinic_id IS NOT NULL
            AND ${where_1}
        GROUP BY
            k.payment_type_id 
        ORDER BY
            pendapatan desc
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


const keuanganController = {
    trendPendapatan,
    pendapatan,
    pendapatanPerUnit,
    pendapatanPerJenis,
    pendapatanCaraBayar,
    pendapatanPerPenunjang,
    pendapatanPerRanap,
    pendapatanPerCaraBayar,
    klaimStatus
}

module.exports = keuanganController
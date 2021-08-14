require("dotenv").config()
const db = require("../../../tools/database");

const trendPendapatan = async (req, res, next) => {
    try {
        const [rows] = await db.query(`
        SELECT
            MONTH(k.date) as bulan,
            SUM(total) as total
        FROM
            kwitansi k
        LEFT JOIN ref_payment_types rpt ON
            k.payment_type_id = rpt.id
        WHERE
            YEAR(k.date) = 2021
            AND k.status NOT IN("BELUM BAYAR")
        GROUP BY
            MONTH(k.date)
        ORDER BY
            total DESC
            `)

        res.json({
            "success": true,
            "data": rows
        })
    } catch (error) {
        next(error)
    }
}

const pendapatan = async (req, res, next) => {
    try {
        const [rows] = await db.query(`
            SELECT
                rpt.name,
                SUM(total) as total
            FROM
                kwitansi k
                LEFT JOIN ref_payment_types rpt ON
                k.payment_type_id = rpt.id
            WHERE 
                    DATE(k.bayar_tgl) BETWEEN STR_TO_DATE('01 aug 2021',
                    '%e %b %Y') AND STR_TO_DATE('31 aug 2021',
                    '%e %b %Y')
            GROUP BY
                payment_type_id
            ORDER BY
                total DESC
            `)

        const [targetTahun] = await db.query(`
        SELECT tahun, total FROM ref_target_total rtt 
        `)

        const total = rows.map(item => parseInt(item.total)).reduce((prev, next) => prev + next);
        const totalavg = Math.ceil(total/31)



        res.json({
            "success": true,
            "total": total,
            "totalavg": totalavg,
            "targetTahun": targetTahun

        })
    } catch (error) {
        next(error)
    }
}

const pendapatanPerUnit = async (req, res, next) => {
    try {
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
            and DATE(k.date) BETWEEN STR_TO_DATE('01 aug 2021',
            '%e %b %Y') AND STR_TO_DATE('31 aug 2021',
            '%e %b %Y')
        GROUP BY
            rc.id,
            rc.name
        ORDER BY
            pendapatan desc
        `)
        res.json({
            "success": true,
            "data": `${rows}`
        })
    } catch (error) {
        next(error)
    }
}

const pendapatanPerJenis = async (req, res, next) => {
    
	//k.jenis != 'RI'	and 
    try {
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
        WHERE
            DATE(k.date) BETWEEN STR_TO_DATE('01 aug 2021',
            '%e %b %Y') AND STR_TO_DATE('31 aug 2021',
            '%e %b %Y')
        GROUP by
            k.jenis
        ORDER BY pendapatan DESC 
        `)
        res.json({
            "success": true,
            "data": `${rows}`
        })
    } catch (error) {
        next(error)
    }
}

const pendapatanCaraBayar = async (req, res, next) => {
    
	//k.jenis != 'RI'	and 
    try {
        const [rows] = await db.query(`
        SELECT
            *,
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
                v.continue_id not IN(10) and
                DATE(v.date) BETWEEN STR_TO_DATE('01 aug 2021',
                '%e %b %Y') AND STR_TO_DATE('31 aug 2021',
                '%e %b %Y')
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
            WHERE
                DATE(vi.entry_date) BETWEEN STR_TO_DATE('01 aug 2021',
                '%e %b %Y') AND STR_TO_DATE('31 aug 2021',
                '%e %b %Y')
            GROUP BY
                vi.payment_type_id
            ORDER BY
                rpt.name ) as vi ON
            v.name1 = vi.name2
	    GROUP BY v.name1
        `)
        res.json({
            "success": true,
            "data": `${rows}`
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
}

module.exports = keuanganController
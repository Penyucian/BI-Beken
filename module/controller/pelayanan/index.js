require("dotenv").config()
const db = require("../../../tools/database");


// TRENDMASUKRS
const trendMasukRumahSakit = async (req, res, next) => {
    try {
        const [kunjunganRJ] = await db.query(`
		SELECT 
            MONTH(v.date) as bulan,
            COUNT(v.id) as jml
        FROM 
            visits v 
            JOIN ref_clinics rc ON (rc.id = v.clinic_id)
        WHERE YEAR(v.date) = 2021
            AND rc.type IN ("rawat jalan")
        GROUP BY YEAR(v.date), MONTH(v.date)
        `)

        const [kunjunganRI] = await db.query(`
        SELECT 
            MONTH(vic.entry_date) as bulan,
            COUNT(vic.inpatient_clinic_id) as jml
        FROM 
            visits_inpatient_clinic vic
            left join ref_inpatient_clinics ric on vic.inpatient_clinic_id = ric.id
        WHERE YEAR(vic.entry_date) = 2021
        GROUP BY YEAR(vic.entry_date), MONTH(vic.entry_date)
        `)

        res.json({
            "success": true,
            "kunjunganRJ": kunjunganRJ,
            "kunjunganRI": kunjunganRI 
        })
    } catch (error) {
        next(error)
    }
}

const kunjungan = async (req, res, next) => {
    try {
        const [kunjungan] = await db.query(`
		SELECT 
            COUNT(v.id) as jml
        FROM 
            visits v 
            JOIN ref_clinics rc ON (rc.id = v.clinic_id)
        WHERE DATE(v.date) BETWEEN STR_TO_DATE('01 aug 2021', '%e %b %Y') AND STR_TO_DATE('31 aug 2021', '%e %b %Y')
            AND rc.type IN ("rawat jalan")
            AND v.continue_id not in(10)
        `)

        function kunjunganAVG(total) {
            console.log(Math.ceil(total[0].jml/30));
            return Math.ceil(total[0].jml/30)
        }

        res.json({
            "success": true,
            "kunjungan": kunjungan,
            "kunjunganAVG": kunjunganAVG(kunjungan),
        })
    } catch (error) {
        next(error)
    }
}

const kunjunganDanPengunjung = async (req, res, next) => {
    try {
        const [kunjunganBL] = await db.query(`
		SELECT
            v.jenis_kunjungan,
            COUNT(v.id) as jumlah
        FROM
            visits v
        WHERE
            v.continue_id not in(10)
            AND DATE(v.date) BETWEEN STR_TO_DATE('01 aug 2021',
            '%e %b %Y') AND STR_TO_DATE('31 aug 2021',
            '%e %b %Y')
        GROUP BY v.jenis_kunjungan 
        `)
         
        const [kunjunganLP] = await db.query(`
		SELECT
            p.sex,
            COUNT(p.sex) as jumlah
        FROM
            visits v
        JOIN patients p ON v.patient_id = p.id 
        WHERE
            v.continue_id not in(10)
            AND DATE(v.date) BETWEEN STR_TO_DATE('01 aug 2021',
            '%e %b %Y') AND STR_TO_DATE('31 aug 2021',
            '%e %b %Y')
        GROUP BY p.sex 
        `)
         
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
                AND DATE(v.date) BETWEEN STR_TO_DATE('01 aug 2021',
                '%e %b %Y') AND STR_TO_DATE('31 aug 2021',
                '%e %b %Y')
            GROUP BY
                v.patient_id ) as total
        GROUP BY
            total.jenis_kunjungan
        `)

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
                terpakai.forEach(y=>{
                    if (x.kelas_id == y.kelas_id) {
                        x.tersedia = x.kapasitas - y.jml
                        x.tersedia = ((x.tersedia<0)?0:x.tersedia)
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
                terpakai.forEach(y=>{
                    if (x.kelas_id == y.kelas_id) {
                        x.tersedia = x.kapasitas - y.jml
                        x.tersedia = ((x.tersedia<0)?0:x.tersedia)
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

const sepuluhBesarRajal = async (req, res, next) => {
    try {
        const [rows] = await db.query(`
		SELECT 
            ad.icd_code,
            ad.icd_name,
            COUNT(ad.icd_code) as jml
        FROM 
            anamnese_diagnoses ad
            JOIN visits v ON (v.id = ad.visit_id)
            JOIN patients p ON (p.id = v.patient_id)
        WHERE DATE(v.date) BETWEEN STR_TO_DATE('01 aug 2021', '%e %b %Y') AND STR_TO_DATE('31 aug 2021', '%e %b %Y')
        GROUP BY ad.icd_code
        ORDER BY jml DESC, name
        limit 10
        `)
        res.json({
            "success": true,
            "data": `${rows}`
        })
    } catch (error) {
        next(error)
    }
}

const sepuluhBesarRanap = async (req, res, next) => {
    try {
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
        WHERE DATE(v.date) BETWEEN STR_TO_DATE('01 aug 2021', '%e %b %Y') AND STR_TO_DATE('31 aug 2021', '%e %b %Y')
        GROUP BY ad.icd_code
        ORDER BY jml DESC, name
        limit 10
        `)
        res.json({
            "success": true,
            "data": `${rows}`
        })
    } catch (error) {
        next(error)
    }
}

const kunjunganRJ = async (req, res, next) => {
    try {
        const [rows] = await db.query(`
		SELECT 
            rc.name as label,
            COUNT(v.id) as jml
        FROM 
            visits v 
            JOIN ref_clinics rc ON (rc.id = v.clinic_id)
        WHERE DATE(v.date) BETWEEN STR_TO_DATE('01 aug 2021', '%e %b %Y') AND STR_TO_DATE('31 aug 2021', '%e %b %Y')
            AND rc.type IN ("rawat jalan")
        GROUP BY rc.id
        ORDER BY jml DESC, name
        `)
        res.json({
            "success": true,
            "data": `${rows}`
        })
    } catch (error) {
        next(error)
    }
}

const kunjunganRI = async (req, res, next) => {
    try {
        const [rows] = await db.query(`
        SELECT 
            ric.name as label,
            COUNT(vic.inpatient_clinic_id) as jml
        FROM 
            visits_inpatient_clinic vic
            left join ref_inpatient_clinics ric on vic.inpatient_clinic_id = ric.id
        WHERE DATE(vic.entry_date) BETWEEN STR_TO_DATE('01 aug 2021', '%e %b %Y') AND STR_TO_DATE('31 aug 2021', '%e %b %Y')
        GROUP BY ric.name
        ORDER BY jml DESC, name
        `)
        res.json({
            "success": true,
            "data": `${rows}`
        })
    } catch (error) {
        next(error)
    }
}

const kunjunganCaraBayar = async (req, res, next) => {
    try {
        const [rows] = await db.query(`
		SELECT 
            r.name as label,
            COUNT(v.payment_type_id) as total
        FROM 
            visits v
            JOIN ref_payment_types r ON (r.id = v.payment_type_id)
        WHERE DATE(v.date) BETWEEN STR_TO_DATE('01 aug 2021', '%e %b %Y') AND STR_TO_DATE('31 aug 2021', '%e %b %Y')
        AND v.continue_id not in(10)
        GROUP BY label 
        ORDER BY total desc
        `)
        res.json({
            "success": true,
            "data": `${rows}`
        })
    } catch (error) {
        next(error)
    }
}

const kunjunganKecamatan = async (req, res, next) => {
    try {
        const [rows] = await db.query(`
        SELECT 
            rsd.name as label,
            COUNT(v.sub_district_id) as jml
        FROM 
            visits v
            left join ref_sub_districts rsd on v.sub_district_id = rsd.id 
        WHERE DATE(v.date) BETWEEN STR_TO_DATE('01 aug 2021', '%e %b %Y') AND STR_TO_DATE('31 aug 2021', '%e %b %Y')
        GROUP BY rsd.name 
        ORDER BY jml DESC, name
        limit 10
        `)
        res.json({
            "success": true,
            "data": `${rows}`
        })
    } catch (error) {
        next(error)
    }
}

const penggunaanObatTertinggi = async (req, res, next) => {
    try {
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
            AND DATE(pr.date) BETWEEN STR_TO_DATE("01 aug 2021", '%e %b %Y') AND STR_TO_DATE("31 aug 2021",	'%e %b %Y')
        GROUP BY
            prd.drug_code
        ORDER BY total DESC, prd.drug_name 
        `)
        res.json({
            "success": true,
            "data": `${rows}`
        })
    } catch (error) {
        next(error)
    }
}

const stockObat = async (req, res, next) => {
    try {
        const [rows] = await db.query(`
		SELECT
            dtd.drug_code,
            rdg.name,
            rd.formularium,
            SUM(dtd.jumlah) as jumlah
        FROM
            drugs_transaction dt
        JOIN drugs_transaction_detail dtd ON
            (dtd.drug_transaction_id = dt.id)
        JOIN ref_drugs rd on
            dtd.drug_code = rd.code
        left JOIN ref_drugs_group rdg on
            rdg.id = rd.drug_group_id
        WHERE
            DATE(dt.date) <= STR_TO_DATE("08 aug 2021",
            '%e %b %Y')
        GROUP BY
            dtd.drug_code 
        `)
        res.json({
            "success": true,
            "data": `${rows}`
        })
    } catch (error) {
        next(error)
    }
}

const stateCovid = async (req, res, next) => {
    try {
        const [entrydateCovid] = await db.query(`
		SELECT
            vi.covid19_status,
            COUNT(vi.covid19_status) as totalAwal
        FROM
            visits_inpatient vi
        where
            vi.covid19_status is not null
            AND DATE(vi.exit_date) is null
            AND DATE(vi.entry_date) BETWEEN STR_TO_DATE('01 aug 2021',
            '%e %b %Y') AND STR_TO_DATE('31 aug 2021',
            '%e %b %Y')
            AND covid19_status in("Konfirmasi")
        GROUP BY
            vi.covid19_status
        `)
        
        const [exitdateCovid] = await db.query(`
		SELECT
            vi.covid19_status,
            COUNT(vi.covid19_status) as totalAwal
        FROM
            visits_inpatient vi
        where
            vi.covid19_status is not null
            AND DATE(vi.exit_date) BETWEEN STR_TO_DATE('01 aug 2021',
            '%e %b %Y') AND STR_TO_DATE('31 aug 2021',
            '%e %b %Y')
            AND covid19_status in("Konfirmasi")
        GROUP BY
            vi.covid19_status
        `)
        
        function finalCovid(x, y) {
            let z 
            z = x[0].totalAwal - y[0].totalAwal
            return z
        }

        console.log(exitdateCovid[0]);
        res.json({
            "success": true,
            "data": finalCovid(entrydateCovid,exitdateCovid)
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
}

module.exports = pelayanController
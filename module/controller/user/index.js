require("dotenv").config()
const db = require("../../../tools/database");
const md5 = require(`js-md5`)
const JWT = require(`jsonwebtoken`)
const JWT_KEY = process.env.JWT_KEY

const getUser = async (req, res, next) => {
    try {
        const [rows] = await db.query(`select * from users where username = "bismillah"`)
        res.json({
            "success": true,
            "data": rows
        })
    } catch (error) {
        next(error)
    }
}

const loginUser = async (req, res, next) => {

    const username = req.body.username

    const [rows] = await db.query(`select * from users where username = ?`, [username])

    if (rows.length != 0) {
        const user = rows[0]
        const password = req.body.password
        
        if (md5(password) == user.pwd) {
            const payload = {
                "user_id": user.id,
                "user_uname": user.username,
                "user_name" : user.name
            }
            const token = await JWT.sign(payload, JWT_KEY)

            if (token) {
                res.json({
                    "code": 200,
                    "data": `Prime ${token}`,
                    "group": user.group_id
                })
            } else{
                res.json({
                    "code": 500,
                    "message": "JWT Error, cant create token"
                })
                /*const error = new Error("JWT Error, cant create token")
                next(error)*/
            }
        } else {
            res.json({
                "code": 403,
                "message": "Password salah"
            })
            /*const error = new Error("Wrong Password");
            next(error)*/
        }
    } else {
        res.json({
            "code": 404,
            "message": "Username tidak ditemukan"
        })
        /*const error = new Error("Username not registered");
        next(error)*/
    }
}

const userController = {
    getUser,
    loginUser
}

module.exports = userController
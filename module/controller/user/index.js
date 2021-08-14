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
                    "success": true,
                    "data": `Prime ${token}`
                })
            } else{
                res.status(500)
                const error = new Error("JWT Error, cant create token")
                next(error)
            }
        } else {
            res.status(403)
            const error = new Error("Wrong Password");
            next(error)
        }
    } else {
        res.status(404)
        const error = new Error("Username not registered");
        next(error)
    }
}

const userController = {
    getUser,
    loginUser
}

module.exports = userController
require("dotenv").config()
const JWT = require(`jsonwebtoken`)
const JWT_KEY = process.env.JWT_KEY

const checkAuthorization = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        if (token) {
            try {
                const payload = await JWT.verify(token, JWT_KEY)

                if (payload) {
                    req.user = payload
                    next()
                } else {
                    res.status(403)
                    const error = new Error("Wrong Token")
                    next(error)
                }
            } catch (error) {
                res.status(500)
                next(error)
            }
        }
    } else {
        res.status(403)
        const error = new Error("Let's Login First");
        next(error)
    }
}

const middleware = {
    checkAuthorization
}

module.exports = middleware
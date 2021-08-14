const mysql = require(`mysql2/promise`)

const db = mysql.createPool({
    host: `192.168.128.30`,
    user: `punyars`,
    password: `.,/MantapJ1w4805!@#`,
    database: `simrs`
})

module.exports = db
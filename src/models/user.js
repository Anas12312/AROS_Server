const pool = require('../database/postgres')

const login = async ({
    email,
    password
}) => {
    const { rows, rowCount } = await pool.query('SELECT * FROM "users" WHERE email = $1 AND password = $2', [email, password])
    if(rowCount) {
        return rows[0]
    }
}


module.exports = {
    login
}
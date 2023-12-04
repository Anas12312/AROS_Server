const pool = require('../database/postgres')

const login = async ({
    email,
    password
}) => {
    const { rows, rowCount } = await pool.query('SELECT * FROM "users" WHERE email = $1 AND password = $2', [email, password])
    if(rowCount) {
        return rows[0]
    }
    return null
};

const signup = async ({
    first_name,
    last_name,
    email,
    password
}) => {
    const { rows, rowCount } = await pool.query('INSERT INTO "users" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, email, password])
    console.log(rowCount)
    if(rowCount) {
        return rows[0]
    }
    return null
}


module.exports = {
    login,
    signup
}
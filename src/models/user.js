const pool = require('../database/postgres');
const bcrypt = require('bcryptjs');

const login = async ({
    email,
    password
}) => {
    const { rows, rowCount } = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);

    if (rowCount) {
        const isPasswordValid = await bcrypt.compare(password, rows[0].password);

        if (isPasswordValid) {
            return rows[0];
        }
    }
    return null
};

const signup = async ({
    firstName,
    lastName,
    email,
    password,
    role
}) => {
    const { rows, rowCount } = await pool.query(
        'INSERT INTO "users" (first_name, last_name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [firstName, lastName, email, password, role]
    )
    if (rowCount) {
        return rows[0]
    }
    return null
};


module.exports = {
    login,
    signup
};
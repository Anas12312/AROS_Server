const User = require('../models/user')

const login = async ({ email, password }) => {
    if(!email || !password) {
        return null
    }
    return await User.login({
        email,
        password
    })
}

module.exports = {
    login
}
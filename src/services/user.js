const validator = require('validator');
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

const signup = async ({ firstName, lastName, email, password }) => {
    if(!firstName || !lastName || !email || !password) {
        return 'All fields are required!'
    }
    if(!validator.isEmail(email)) {
        return 'Invalid Email!'
    }
    if(password.length < 6) {
        return 'Password must be at least 6 characters!'
    }
    return await User.signup({
        firstName,
        lastName,
        email,
        password
    })
};

module.exports = {
    login,
    signup
}
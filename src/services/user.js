const validator = require('validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// hash password
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// generate token
function generateToken(user) {
    const token = jwt.sign(
        {
            _id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET
    );
    return token;
}


// login
const login = async ({ email, password }) => {
    if (!email || !password) {
        return null;
    }
    if (!validator.isEmail(email)) {
        return 'Invalid Email!';
    }
    const user = await User.login({
        email,
        password
    });

    if (!user) {
        return 'Invalid credentials!';
    }

    const token = generateToken(user);
    return { user, token };
};

// signup
const signup = async ({ firstName, lastName, email, password, role }) => {
    if (!firstName || !lastName || !email || !password) {
        return 'All fields are required!';
    }
    if (!validator.isEmail(email)) {
        return 'Invalid Email!';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters!';
    }
    if (!role) {
        role = 'user';
    }
    password = await hashPassword(password);
    const user = await User.signup({
        firstName,
        lastName,
        email,
        password,
        role
    });
    const token = generateToken(user);
    return { user, token };
};

module.exports = {
    login,
    signup
};

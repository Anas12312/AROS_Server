const validator = require('validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// hash password
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

// generate token
function generateToken(user) {
    const token = jwt.sign(
        {
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET
    );
    return token;
};

// login Input Validation
const loginInputValidation = ({ email, password }) => {
    if (!email || !password) {
        return 'email and password are required!';
    }
    if (!validator.isEmail(email)) {
        return 'Invalid Email!';
    }
    return null;
};

//signupInputValidation
const signupInputValidation = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !lastName || !email || !password) {
        return 'All fields are required!';
    }
    if (!validator.isEmail(email)) {
        return 'Invalid Email!';
    }
    if (password.length < 6) {
        return 'Password must be at least 6 characters!';
    }
    return null;
};

//signupProcess
const signupProcess = async ({ firstName, lastName, email, password, role }) => {
    try {
        const validationError = await signupInputValidation({ firstName, lastName, email, password });
        if (validationError) {
            return validationError;
        }

        email = email.toLowerCase();
        password = await hashPassword(password);

        const user = await User.signup({
            firstName,
            lastName,
            email,
            password,
            role
        });

        if (!user) {
            return 'Signup Failed!';
        }

        const token = generateToken(user);
        return { user, token };

    } catch (error) {
        if (error.code === '23505' && error.constraint === 'users_email_key') {
            return 'Email already exists!';
        }
    }
};

const login = async ({ email, password }) => {
    const validationError = loginInputValidation({ email, password });

    if (validationError) {
        return validationError;
    }

    email = email.toLowerCase();
    const user = await User.login({
        email,
        password
    });

    if (!user) {
        return 'Authentication Failed! Email or Password might be wrong!';
    }

    const token = generateToken(user);
    return { user, token };
};


// signup for users
const signup = async ({ firstName, lastName, email, password }) => {
    const signup = await signupProcess({ firstName, lastName, email, password, role: 'user' });
    return signup;
};

// signup for admins
const adminSignup = async ({ firstName, lastName, email, password }) => {
    const signup = await signupProcess({ firstName, lastName, email, password, role: 'admin' });
    return signup;
};

module.exports = {
    login,
    signup,
    adminSignup
};

const express = require('express');
const { login, signup, adminSignup } = require('../services/user');

const router = new express.Router();

// Login 
router.post('/login', async (req, res) => {
    const payload = {
        email: req.body.email,
        password: req.body.password
    };

    const result = await login(payload);

    if (result === 'email and password are required!' || result === 'Invalid Email!' || result === 'Authentication Failed! Email or Password might be wrong!') {
        return res.status(400).send({
            message: result
        });
    }

    return res.status(200).send(result);
});

// Signup for users
router.post('/signup', async (req, res) => {
    const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };

    const result = await signup(payload);

    if (result === 'All fields are required!' || result === 'Invalid Email!' || result === 'Password must be at least 6 characters!' || result === 'Signup Failed!' || result === 'Email already exists!') {
        return res.status(400).send({
            message: result
        });
    }
    return res.status(201).send(result);
});

// Signup for admins
router.post('/adminSignup', async (req, res) => {
    const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    };

    const result = await adminSignup(payload);

    if (result === 'All fields are required!' || result === 'Invalid Email!' || result === 'Password must be at least 6 characters!' || result === 'Signup Failed!' || result === 'Email already exists!') {
        return res.status(400).send({
            message: result
        });
    }
    return res.status(201).send(result);
});

module.exports = router;

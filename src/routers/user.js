const express = require('express');
const { login, signup } = require('../services/user');

const router = new express.Router();

// Login
router.post('/login', async (req, res) => {
    const payload = {
        email: req.body.email,
        password: req.body.password
    };

    const result = await login(payload);

    if (result === 'Invalid Email!') {
        return res.status(400).send({
            message: 'Invalid Email!'
        });
    }

    if (!result.user) {
        return res.status(400).send({
            message: 'Authentication Failed! Email or Password might be wrong!'
        });
    }

    return res.status(200).send(result);
});

// Signup
router.post('/signup', async (req, res) => {
    const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };

    const result = await signup(payload);

    if (!result.user) {
        return res.status(400).send({
            message: 'Signup Failed!'
        });
    }

    if (result === 'All fields are required!' || result === 'Invalid Email!' || result === 'Password must be at least 6 characters!') {
        return res.status(400).send({
            message: result
        });
    }
    return res.status(201).send(result);
});

module.exports = router;

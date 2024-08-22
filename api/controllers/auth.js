const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.username], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });
        if (result.length) return res.status(409).json([ 'User already exists' ]);

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
        const values = [
            req.body.username,
            req.body.email,
            hashPass
        ];

        db.query(q, values, (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error', details: err });

            return res.status(201).json('User has been created');
        });
    });
};


const login = (req, res) => {
    try {
        const q = "SELECT * FROM users WHERE username = ?";

        db.query(q, [req.body.username], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error', details: err });
            }
            if (result.length === 0) return res.status(404).json({ error: 'User not found' });

            const user = result[0];

            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) return res.status(401).json('Incorrect username or password');

            const token = jwt.sign({ id: user.id }, "jwtkey", { expiresIn: '1h' });

            const { password, ...other } = user;

            res.cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 3600000,
            }).status(200).json(other);
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'Internal server error', details: error });
    }
};




const logout = (req, res) => {
    res.clearCookie('access_token', {
        sameSite: 'none',
        secure: true
    }); // Clear the JWT cookie
    return res.status(200).json({ message: 'Logout successful' });
};





module.exports ={register, login, logout};
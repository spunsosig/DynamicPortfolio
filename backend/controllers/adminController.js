const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (username !== process.env.ADMIN_USERNAME || 
        password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { username: process.env.ADMIN_USERNAME },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.json({ token });
};

exports.verifyToken = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.json({ valid: true });
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
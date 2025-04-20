const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Updated JSON handling with UTF-8 encoding
    typeCast: function (field, next) {
        if (field.type === 'JSON') {
            const value = field.string();
            console.log('TypeCast JSON field:', {
                name: field.name,
                value: value,
                type: typeof value
            });
            try {
                return JSON.parse(value);
            } catch (err) {
                console.error('JSON parsing error:', value);
                return value;
            }
        }
        return next();
    }
});

module.exports = pool;
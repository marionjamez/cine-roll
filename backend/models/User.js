const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
    create: async (email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
            [email, hashedPassword]
        );
        return result.rows[0];
    },

    findByEmail: async (email) => {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },

    findById: async (id) => {
        const result = await db.query('SELECT id, email, created_at FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }
};

module.exports = User;

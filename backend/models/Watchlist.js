const db = require('../config/db');

const Watchlist = {
    add: async (userId, movieId) => {
        const result = await db.query(
            'INSERT INTO watchlist (user_id, movie_id) VALUES ($1, $2) ON CONFLICT (user_id, movie_id) DO NOTHING RETURNING *',
            [userId, movieId]
        );
        return result.rows[0];
    },

    remove: async (userId, movieId) => {
        const result = await db.query(
            'DELETE FROM watchlist WHERE user_id = $1 AND movie_id = $2 RETURNING *',
            [userId, movieId]
        );
        return result.rows[0];
    },

    findByUserId: async (userId) => {
        const result = await db.query(
            'SELECT * FROM watchlist WHERE user_id = $1 ORDER BY added_at DESC',
            [userId]
        );
        return result.rows;
    },

    checkIfInWatchlist: async (userId, movieId) => {
        const result = await db.query(
            'SELECT * FROM watchlist WHERE user_id = $1 AND movie_id = $2',
            [userId, movieId]
        );
        return result.rows.length > 0;
    }
};

module.exports = Watchlist;

const db = require('../config/db');

const Review = {
    create: async (userId, movieId, rating, reviewText) => {
        const result = await db.query(
            'INSERT INTO reviews (user_id, movie_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, movieId, rating, reviewText]
        );
        return result.rows[0];
    },

    findByMovieId: async (movieId) => {
        const result = await db.query(
            'SELECT reviews.*, users.email FROM reviews JOIN users ON reviews.user_id = users.id WHERE movie_id = $1 ORDER BY created_at DESC',
            [movieId]
        );
        return result.rows;
    },

    findByUserId: async (userId) => {
        const result = await db.query(
            'SELECT * FROM reviews WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        return result.rows;
    },

    delete: async (id, userId) => {
        const result = await db.query(
            'DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );
        return result.rows[0];
    }
};

module.exports = Review;

const Review = require('../models/Review');

const addReview = async (req, res) => {
    const { movieId, rating, reviewText } = req.body;
    try {
        const review = await Review.create(req.user.id, movieId, rating, reviewText);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error: error.message });
    }
};

const getMovieReviews = async (req, res) => {
    const { movieId } = req.params;
    try {
        const reviews = await Review.findByMovieId(movieId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
};

const getUserReviews = async (req, res) => {
    try {
        const reviews = await Review.findByUserId(req.user.id);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user reviews', error: error.message });
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.delete(id, req.user.id);
        if (review) {
            res.json({ message: 'Review deleted' });
        } else {
            res.status(404).json({ message: 'Review not found or not authorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
};

module.exports = { addReview, getMovieReviews, getUserReviews, deleteReview };

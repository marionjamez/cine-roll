const express = require('express');
const { addReview, getMovieReviews, getUserReviews, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addReview);
router.get('/movie/:movieId', getMovieReviews);
router.get('/user', protect, getUserReviews);
router.delete('/:id', protect, deleteReview);

module.exports = router;

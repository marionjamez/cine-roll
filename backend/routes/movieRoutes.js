const express = require('express');
const { searchMovies, getMovieDetails, getTrendingMovies } = require('../controllers/movieController');

const router = express.Router();

router.get('/search', searchMovies);
router.get('/trending', getTrendingMovies);
router.get('/:id', getMovieDetails);

module.exports = router;

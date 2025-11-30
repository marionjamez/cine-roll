const axios = require('axios');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const searchMovies = async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                query,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching from TMDb', error: error.message });
    }
};

const getMovieDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                append_to_response: 'credits,similar',
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie details', error: error.message });
    }
};

const getTrendingMovies = async (req, res) => {
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trending movies', error: error.message });
    }
};

module.exports = { searchMovies, getMovieDetails, getTrendingMovies };

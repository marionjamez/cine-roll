const Watchlist = require('../models/Watchlist');

const addToWatchlist = async (req, res) => {
    const { movieId } = req.body;
    try {
        const item = await Watchlist.add(req.user.id, movieId);
        if (item) {
            res.status(201).json(item);
        } else {
            res.status(200).json({ message: 'Movie already in watchlist' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding to watchlist', error: error.message });
    }
};

const removeFromWatchlist = async (req, res) => {
    const { movieId } = req.params;
    try {
        const item = await Watchlist.remove(req.user.id, movieId);
        if (item) {
            res.json({ message: 'Movie removed from watchlist' });
        } else {
            res.status(404).json({ message: 'Movie not found in watchlist' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error removing from watchlist', error: error.message });
    }
};

const getWatchlist = async (req, res) => {
    try {
        const watchlist = await Watchlist.findByUserId(req.user.id);
        res.json(watchlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching watchlist', error: error.message });
    }
};

const checkWatchlistStatus = async (req, res) => {
    const { movieId } = req.params;
    try {
        const isInWatchlist = await Watchlist.checkIfInWatchlist(req.user.id, movieId);
        res.json({ isInWatchlist });
    } catch (error) {
        res.status(500).json({ message: 'Error checking watchlist status', error: error.message });
    }
};

module.exports = { addToWatchlist, removeFromWatchlist, getWatchlist, checkWatchlistStatus };

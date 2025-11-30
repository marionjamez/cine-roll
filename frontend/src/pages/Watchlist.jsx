import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Trash2, Loader } from 'lucide-react';

const Watchlist = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        try {
            const { data } = await api.get('/watchlist');
            // Fetch full movie details for each item in watchlist
            const moviePromises = data.map(item => api.get(`/movies/${item.movie_id}`));
            const movieResponses = await Promise.all(moviePromises);
            setMovies(movieResponses.map(res => res.data));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWatchlist = async (movieId) => {
        try {
            await api.delete(`/watchlist/${movieId}`);
            setMovies(movies.filter(m => m.id !== movieId));
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="flex justify-center py-20"><Loader className="animate-spin text-primary" size={48} /></div>;

    return (
        <div className="min-h-screen bg-dark text-white p-8">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8">My Watchlist</h2>
                {movies.length === 0 ? (
                    <p className="text-gray-400">Your watchlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {movies.map((movie) => (
                            <div key={movie.id} className="bg-dark-lighter rounded-lg overflow-hidden flex shadow-lg">
                                <Link to={`/movie/${movie.id}`} className="w-1/3">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                </Link>
                                <div className="p-4 w-2/3 flex flex-col justify-between">
                                    <div>
                                        <Link to={`/movie/${movie.id}`}>
                                            <h3 className="text-xl font-bold mb-2 hover:text-primary transition">{movie.title}</h3>
                                        </Link>
                                        <p className="text-gray-400 text-sm line-clamp-3">{movie.overview}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromWatchlist(movie.id)}
                                        className="self-end text-red-500 hover:text-red-400 p-2"
                                        title="Remove from Watchlist"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;

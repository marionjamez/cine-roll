import { useState, useEffect } from 'react';
import api from '../api/axios';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import { Loader } from 'lucide-react';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetchTrending();
    }, []);

    const fetchTrending = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/movies/trending');
            setMovies(data.results);
            setIsSearching(false);
        } catch (err) {
            setError('Failed to fetch trending movies');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query) => {
        setLoading(true);
        try {
            const { data } = await api.get('/movies/search', { params: { query } });
            setMovies(data.results);
            setIsSearching(true);
        } catch (err) {
            setError('Failed to search movies');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark">
            <Hero onSearch={handleSearch} />

            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-white">
                        {isSearching ? 'Search Results' : 'Trending Now'}
                    </h2>
                    {isSearching && (
                        <button
                            onClick={fetchTrending}
                            className="text-primary hover:text-white transition"
                        >
                            Back to Trending
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader className="animate-spin text-primary" size={48} />
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center py-10">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;

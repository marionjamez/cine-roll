import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Plus, Check, Loader } from 'lucide-react';
import api from '../api/axios';
import ReviewForm from '../components/ReviewForm';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inWatchlist, setInWatchlist] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchMovieData();
    }, [id]);

    const fetchMovieData = async () => {
        setLoading(true);
        try {
            const [movieRes, reviewsRes] = await Promise.all([
                api.get(`/movies/${id}`),
                api.get(`/reviews/movie/${id}`)
            ]);
            setMovie(movieRes.data);
            setReviews(reviewsRes.data);

            if (user) {
                const watchlistRes = await api.get(`/watchlist/${id}/status`);
                setInWatchlist(watchlistRes.data.isInWatchlist);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleWatchlistToggle = async () => {
        try {
            if (inWatchlist) {
                await api.delete(`/watchlist/${id}`);
                setInWatchlist(false);
            } else {
                await api.post('/watchlist', { movieId: id });
                setInWatchlist(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleReviewAdded = (newReview) => {
        setReviews([newReview, ...reviews]);
    };

    if (loading) return <div className="flex justify-center py-20"><Loader className="animate-spin text-primary" size={48} /></div>;
    if (!movie) return <div className="text-center py-20 text-white">Movie not found</div>;

    return (
        <div className="min-h-screen bg-dark text-white">
            <div className="relative h-[60vh]">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>

                <div className="container mx-auto px-4 relative h-full flex items-end pb-12">
                    <div className="flex flex-col md:flex-row gap-8 items-end">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-48 md:w-64 rounded-lg shadow-2xl"
                        />
                        <div className="mb-4">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
                            <div className="flex items-center gap-6 mb-6">
                                <span className="flex items-center gap-2 text-yellow-500 text-xl">
                                    <Star fill="currentColor" /> {movie.vote_average.toFixed(1)}
                                </span>
                                <span className="text-gray-300">{movie.release_date.split('-')[0]}</span>
                                <span className="text-gray-300">{movie.runtime} min</span>
                            </div>

                            {user && (
                                <button
                                    onClick={handleWatchlistToggle}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition ${inWatchlist
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-primary hover:bg-primary-dark'
                                        }`}
                                >
                                    {inWatchlist ? <><Check /> In Watchlist</> : <><Plus /> Add to Watchlist</>}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-12">{movie.overview}</p>

                        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
                        {user && <ReviewForm movieId={id} onReviewAdded={handleReviewAdded} />}

                        <div className="mt-8 space-y-6">
                            {reviews.map((review) => (
                                <div key={review.id} className="bg-dark-lighter p-6 rounded-lg">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="font-bold text-primary">{review.email}</span>
                                            <span className="text-gray-500 text-sm block">
                                                {new Date(review.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    fill={i < review.rating ? 'currentColor' : 'none'}
                                                    className={i < review.rating ? '' : 'text-gray-600'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-300">{review.review_text}</p>
                                </div>
                            ))}
                            {reviews.length === 0 && (
                                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Genres</h3>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {movie.genres.map(g => (
                                <span key={g.id} className="bg-dark-lighter px-3 py-1 rounded-full text-sm text-gray-300">
                                    {g.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;

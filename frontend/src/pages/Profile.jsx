import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Star, Loader, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchUserReviews();
    }, []);

    const fetchUserReviews = async () => {
        try {
            const { data } = await api.get('/reviews/user');
            // Fetch movie details for each review to display title
            const reviewsWithMovies = await Promise.all(data.map(async (review) => {
                const movieRes = await api.get(`/movies/${review.movie_id}`);
                return { ...review, movie: movieRes.data };
            }));
            setReviews(reviewsWithMovies);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteReview = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await api.delete(`/reviews/${reviewId}`);
                setReviews(reviews.filter(r => r.id !== reviewId));
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) return <div className="flex justify-center py-20"><Loader className="animate-spin text-primary" size={48} /></div>;

    return (
        <div className="min-h-screen bg-dark text-white p-8">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-dark-lighter p-8 rounded-lg mb-8">
                    <h2 className="text-3xl font-bold mb-2">Profile</h2>
                    <p className="text-gray-400">Email: {user?.email}</p>
                </div>

                <h3 className="text-2xl font-bold mb-6">My Reviews</h3>
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-dark-lighter p-6 rounded-lg shadow-lg relative">
                            <div className="flex justify-between items-start mb-4">
                                <Link to={`/movie/${review.movie_id}`} className="text-xl font-bold hover:text-primary transition">
                                    {review.movie.title}
                                </Link>
                                <div className="flex items-center gap-4">
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
                                    <button
                                        onClick={() => deleteReview(review.id)}
                                        className="text-red-500 hover:text-red-400 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-300 italic">"{review.review_text}"</p>
                            <p className="text-gray-500 text-sm mt-4">
                                Posted on {new Date(review.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                    {reviews.length === 0 && (
                        <p className="text-gray-400">You haven't written any reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;

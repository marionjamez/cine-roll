import { useState } from 'react';
import { Star } from 'lucide-react';
import api from '../api/axios';

const ReviewForm = ({ movieId, onReviewAdded }) => {
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/reviews', { movieId, rating, reviewText });
            onReviewAdded(data);
            setReviewText('');
            setRating(5);
        } catch (err) {
            setError('Failed to submit review');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-dark-lighter p-6 rounded-lg shadow-lg mt-8">
            <h3 className="text-xl font-bold mb-4 text-white">Write a Review</h3>
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Rating</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                        >
                            <Star
                                size={24}
                                className={star <= rating ? 'text-yellow-500' : 'text-gray-600'}
                                fill={star <= rating ? 'currentColor' : 'none'}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-gray-400 mb-2">Review</label>
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full bg-dark p-3 rounded border border-gray-700 focus:border-primary focus:outline-none text-white h-32"
                    required
                />
            </div>

            <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded transition">
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;

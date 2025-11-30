import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const MovieCard = ({ movie }) => {
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    return (
        <div className="bg-dark-lighter rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-300">
            <Link to={`/movie/${movie.id}`}>
                <img src={posterUrl} alt={movie.title} className="w-full h-96 object-cover" />
                <div className="p-4">
                    <h3 className="text-xl font-bold truncate">{movie.title}</h3>
                    <div className="flex items-center justify-between mt-2 text-gray-400">
                        <span className="flex items-center gap-1">
                            <Star className="text-yellow-500" size={16} fill="currentColor" />
                            {movie.vote_average?.toFixed(1)}
                        </span>
                        <span>{movie.release_date?.split('-')[0]}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;

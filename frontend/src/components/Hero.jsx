import { useState } from 'react';
import { Search } from 'lucide-react';

const Hero = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="relative h-[500px] flex items-center justify-center bg-gradient-to-r from-primary-dark to-dark overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
            <div className="relative z-10 text-center px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                    Cine Roll
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8">
                    Discover, Review, and Track your favorite movies.
                </p>
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative">
                    <input
                        type="text"
                        placeholder="Search for movies..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full p-4 pl-12 rounded-full bg-dark-lighter/80 backdrop-blur-md border border-gray-700 focus:border-primary focus:outline-none text-white placeholder-gray-400"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full transition">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Hero;

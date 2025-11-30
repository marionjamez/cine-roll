import { Link, useNavigate } from 'react-router-dom';
import { Film, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="bg-dark-lighter p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                    <Film /> Cine Roll
                </Link>
                <div className="flex items-center gap-6">
                    <Link to="/" className="hover:text-primary transition">Home</Link>
                    {user ? (
                        <>
                            <Link to="/watchlist" className="hover:text-primary transition">Watchlist</Link>
                            <Link to="/profile" className="flex items-center gap-2 hover:text-primary transition">
                                <User size={20} /> Profile
                            </Link>
                            <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400 transition">
                                <LogOut size={20} /> Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded transition">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

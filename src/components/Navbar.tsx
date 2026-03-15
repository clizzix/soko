import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router';
import { MdHome, MdFavorite } from 'react-icons/md';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="flex">
            {user ? (
                <>
                    <span>Hi, {user.userName}!</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <Link
                    to="/login"
                    className="mx-auto bg-base-200 px-4 py-2 btn btn-ghost font-bold text-xl"
                >
                    Login
                </Link>
            )}
        </nav>
    );
};

export default Navbar;

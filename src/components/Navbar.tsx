import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router';
import { MdHome, MdFavorite, MdLogout, MdAdd } from 'react-icons/md';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="flex absolute bottom-0 bg-base-200 w-full p-6">
            {user ? (
                <div className="flex mx-auto gap-6">
                    <div className="flex justify-center mx-auto gap-4">
                        <Link to="/" className="btn btn-circle btn-secondary">
                            <MdHome size={24} />
                        </Link>
                        <Link
                            to="/activities/create"
                            className="btn btn-circle btn-secondary"
                        >
                            <MdAdd size={24} />
                        </Link>
                    </div>

                    <button
                        onClick={logout}
                        className="btn btn-circle btn-accent absolute right-6"
                    >
                        <MdLogout size={24} />
                    </button>
                </div>
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

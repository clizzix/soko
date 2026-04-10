import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router';
import { MdHome, MdFavorite, MdLogout, MdAdd } from 'react-icons/md';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="flex fixed bottom-0 bg-base-300 border border-black w-full p-4 z-50">
            {user ? (
                <div className="flex mx-auto gap-6">
                    <div className="flex justify-center mx-auto gap-4">
                        <Link to="/" className="btn btn-circle btn-success">
                            <MdHome size={24} />
                        </Link>
                        <Link
                            to="/activity/create"
                            className="btn btn-circle btn-success"
                        >
                            <MdAdd size={24} />
                        </Link>
                        <Link
                            to="/user/favorites"
                            className="btn btn-circle btn-success"
                        >
                            <MdFavorite size={24} />
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
                <div className="flex mx-auto gap-2">
                    <Link
                        to="/login"
                        className="mx-auto bg-base-200 px-4 py-2 btn rounded-xl btn-base text-l"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="btn btn-accent text-l rounded-xl"
                    >
                        Signup
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

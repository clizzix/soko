import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav>
            {user ? (
                <>
                    <span>Hi, {user.userName}!</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
};

export default Navbar;

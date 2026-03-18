import { Link } from 'react-router';

const Header = () => {
    return (
        <div className="navbar bg-neutral text-neutral-content shadow-sm">
            <Link to="/" className="btn btn-ghost text-xl mx-auto">
                SoKo
            </Link>
        </div>
    );
};

export default Header;

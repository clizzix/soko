import { Link } from 'react-router';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <div className="navbar bg-neutral text-neutral-content shadow-sm">
            <Link to="/" className="btn btn-ghost text-xl mx-auto">
                <img src={logo} alt="SoKo Logo" className="h-16" />
                <p className="text-3xl font-bold">SoKo</p>
            </Link>
        </div>
    );
};

export default Header;

import { Link } from 'react-router';
import logo from '../assets/logo.png';
import Searchbar from './Searchbar';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    return (
        <div className="navbar bg-base-300 border border-black shadow-sm justify-between">
            <Link to="/" className="btn btn-ghost text-xl">
                <img src={logo} alt="SoKo Logo" className="h-16" />
                <p className="text-3xl font-bold">SoKo</p>
            </Link>
            <div className="flex items-center gap-2">
                <Searchbar />
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Header;

import { Link } from 'react-router';
import logo from '../assets/logo.png';
import Searchbar from './Searchbar';

const Header = () => {
    return (
        <div className="navbar bg-neutral text-neutral-content shadow-sm justify-between">
            <Link to="/" className="btn btn-ghost text-xl">
                <img src={logo} alt="SoKo Logo" className="h-16" />
                <p className="text-3xl font-bold">SoKo</p>
            </Link>
            <Searchbar />
        </div>
    );
};

export default Header;

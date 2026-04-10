import { useEffect, useState } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'corporate' : 'dark');
    };

    return (
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme === 'dark' ? (
                <MdLightMode size={24} />
            ) : (
                <MdDarkMode size={24} />
            )}
        </button>
    );
};

export default ThemeToggle;

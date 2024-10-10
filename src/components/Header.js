import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    const navigate = useNavigate();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    const handleLogin = () => {
        navigate('/Login');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        // localStorage.removeItem('stats');
        localStorage.removeItem('typingmode');
        navigate('/');
    };

    return (
        <header>
            <div className="theme-toggle" onClick={toggleTheme}>
                {theme === 'light' ? '🌞' : '🌜'}
            </div>
            <div className="user-profile">
                {!isLoggedIn ? (
                    <button onClick={handleLogin}>Login</button>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}
            </div>
        </header>
    );
}

export default Header;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');

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
        // Navigate to login page
        navigate('/Login');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsAdmin(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('isAdmin');
        // Redirect to home or login page
        navigate('/');;
    };

    return (
        <header>
            <div className="logo">
                <Link to="/">CodeTyper Pro</Link>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/test">Typing Test</Link></li>
                    <li><Link to="/progress">Progress</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    {isLoggedIn && isAdmin && <li><Link to="/admin-panel">Admin Panel</Link></li>}
                </ul>
            </nav>
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

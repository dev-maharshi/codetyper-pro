import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await login(username, password);
            setUser(user);
            navigate('/');
            localStorage.setItem('isLoggedIn', 'true');
            window.location.reload();
        } catch (err) {
            setError('Invalid username or password');
        }

    };

    return (
        <div className="container">
            <button className='exitBtn' onClick={() => navigate('/')}>X</button>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <p className="error">{error}</p>}
                <div className='form-group'>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className='submitBtn'>Login</button>
            </form>
            {/* <div className="social-login">
                <p>or sign in with</p>
                <div className="social-buttons">
                    <button className="google">
                        <span className="icon google-icon"></span>
                    </button>
                    <button className="github">
                        <span className="icon github-icon"></span>
                    </button>
                    <button className="facebook">
                        <span className="icon facebook-icon"></span>
                    </button>
                </div>
            </div> */}
            <div className="register-option">
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};
export default Login;

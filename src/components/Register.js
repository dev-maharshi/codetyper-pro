import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const navigate = useNavigate();
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn','true');
      localStorage.setItem('isAdmin','true');
      navigate('/admin-panel');
      window.location.reload();
    } else {
      alert('Invalid credentials');
    }
  };

  return (

    <div className="container">
    <h1>Register</h1>
    <form action="#">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
    </form>
    <div className="social-login">
        <p>or sign up with</p>
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
    </div>
    <div className="login-option">
        <p>Already have an account? <a href="/login">Login</a></p>
    </div>
</div>
    // <main className='register_container'>
    //   <div className='background'>
    //     <div>
    //       <div id='rectangle1' />
    //       <div id='rectangle2' />
    //       <div id='laptopImg' />
    //     </div>
    //     <div className='Register'>
    //       <h2>Welcome!</h2>
    //       <button id="FBButton" onClick={handleSubmit} type='submit'>Sign Up with Facebook</button>
    //       <button id="GButton" onClick={handleSubmit} type='submit'>Sign Up with Google</button>
    //       <button id="GHButton" onClick={handleSubmit} type='submit'>Sign Up with GitHub</button>
    //       <p>Yes i have an account? <strong> <Link to="/Login"> Login </Link></strong></p>
    //     </div>
    //   </div>
    // </main>
  );
}

export default Login;

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

    <main className='register_container'>
      <div className='background'>
        <div>
          <div id='rectangle1' />
          <div id='rectangle2' />
          <div id='laptopImg' />
        </div>
        <div className='Register'>
          <h2>Welcome!</h2>
          <button id="FBButton" onClick={handleSubmit} type='submit'>Sign Up with Facebook</button>
          <button id="GButton" onClick={handleSubmit} type='submit'>Sign Up with Google</button>
          <button id="GHButton" onClick={handleSubmit} type='submit'>Sign Up with GitHub</button>
          <p>Yes i have an account? <strong> <Link to="/Login"> Login </Link></strong></p>
        </div>
      </div>
    </main>
  );
}

export default Login;

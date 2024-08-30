import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin-panel');
      window.location.reload();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
            <div className="container">
                <h1>Login</h1>
                <form action="#">
                    <input className='email' type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit" onClick={handleSubmit}>Login</button>
                </form>
                <div className="social-login">
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
                </div>
                <div className="register-option">
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
            </div>
        );
    };
          // <main className='login_container'>
          //   <div className='background'>
          //     <div>
          //       <div id='rectangle1' />
          //       <div id='laptopImg' />
          //       <div id='rectangle2' />
          //       <div id='rectangle3' />
          //     </div>
          //     <div className='Login'>
          //       <h2>Welcome Back!</h2>
          //       <button id="FBButton" onClick={handleSubmit} type='submit'>Sign In with Facebook</button>
          //       <button id="GButton" onClick={handleSubmit} type='submit'>Sign In with Google</button>
          //       <button id="GHButton" onClick={handleSubmit} type='submit'>Sign In with GitHub</button>
          //       <p>Dont  have and account? <strong> <Link to="/Register"> Register </Link></strong></p>
          //     </div>
          //   </div>
          // </main>

      // <main>
      //   <div>
      //     <h2>Login</h2>
      //     <form onSubmit={handleSubmit}>
      //       <div>
      //         <img src='./FBlogo.svg' alt='' />
      //         <img src='./GLogo.svg' alt='' />
      //         <img src='./GHLogo.svg' alt='' />
      //         <label htmlFor="username">Username: </label>
      //         <input
      //           id="username"
      //           type="text"
      //           value={username}
      //           onChange={(e) => setUsername(e.target.value)}
      //         />
      //       </div>
      //       <div>
      //         <label htmlFor="password">Password: </label>
      //         <input
      //           id="password"
      //           type="password"
      //           value={password}
      //           onChange={(e) => setPassword(e.target.value)}
      //         />
      //       </div>
      //       <button type="submit">Login</button>
      //     </form>
      //   </div>
      // </main>
          export default Login;

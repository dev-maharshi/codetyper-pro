import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const { username, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

  
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful");
        navigate('/login');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred during registration" + error);
    }
  };

  return (
    <div className="container">
    <h1>Register</h1>
    <form className="form" onSubmit={onSubmit}>
    {message && <p className="message">{message}</p>}
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirm Password"
            value={confirmPassword}
            onChange={onChange}
            required
          />
        </div>
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
        <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
</div>
   
  );
}

export default Register;

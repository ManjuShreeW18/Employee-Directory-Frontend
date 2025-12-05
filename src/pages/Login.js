import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext); // Access login function from context
    const navigate = useNavigate();

    // State for input fields and error message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Redirect to dashboard if token exists
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('Login/Login', {
                Username: username,
                Password: password
            });

            login(response.data.token); // Save token and update user context

            // Redirect to dashboard
            navigate('/dashboard', { replace: true });

        } catch (err) {
            setError(err.response?.data || "Login failed"); // Show error message
        }
    };

    return (
        <div className='login-container'>
            <h2>LOGIN</h2>
            <form className='loginForm' onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input 
                    id='username'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type='submit'>Login</button>
            </form>

            {/* Display error if login fails */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;

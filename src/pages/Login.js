import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //  Redirect to dashboard if token exists
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('Login/Login', {
                Username: username,
                Password: password
            });

            login(response.data.token);

            // Prevent going back to login
            navigate('/dashboard', { replace: true });

        } catch (err) {
            setError(err.response?.data || "Login failed");
        }
    };

    return (
        <div className='login-container'>
            <h2>LOGIN</h2>
            <form className='loginForm' onSubmit={handleLogin}>
                <label>Username</label>
                <input 
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type='submit'>Login</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;

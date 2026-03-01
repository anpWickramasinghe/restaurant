import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login();
        navigate('/dashboard');
    };

    return (
        <div className="auth-page">
            <h2>Login</h2>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default Login;

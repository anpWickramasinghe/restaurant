import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthCallback: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Simulate auth token processing
        login();
        navigate('/dashboard');
    }, [login, navigate]);

    return (
        <div className="auth-callback">
            <p>Processing authentication...</p>
        </div>
    );
};

export default AuthCallback;

import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="layout-container">
            <header className="main-header">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/reserve-table">Reservations</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/login">Login</Link>
                </nav>
            </header>
            <main className="main-content">
                {children}
            </main>
            <footer className="main-footer">
                <p>&copy; {new Date().getFullYear()} Restaurant Name. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;

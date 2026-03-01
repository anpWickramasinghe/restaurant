import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground';

    return (
        <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary tracking-tighter">BISTRO.</span>
                    </Link>
                    <nav className="hidden md:flex gap-6 font-medium">
                        <Link to="/" className={`transition-colors py-1 ${isActive('/')}`}>Home</Link>
                        <Link to="/menu" className={`transition-colors py-1 ${isActive('/menu')}`}>Menu</Link>
                        <Link to="/reserve-table" className={`transition-colors py-1 ${isActive('/reserve-table')}`}>Reservations</Link>
                        <Link to="/about" className={`transition-colors py-1 ${isActive('/about')}`}>About Us</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link
                            to="/login"
                            className="text-sm font-medium px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </header>
            <main className="flex-1 w-full flex flex-col items-center">
                {children}
            </main>
            <footer className="w-full border-t border-border bg-card py-8 px-4 text-center mt-auto">
                <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Bistro Restaurant. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;

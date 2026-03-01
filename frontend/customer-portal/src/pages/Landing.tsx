import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground text-center px-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary tracking-tight">
                Savor Every Bite
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
                Experience culinary excellence with our carefully crafted menu featuring locally sourced ingredients.
            </p>
            <div className="flex gap-4">
                <Link
                    to="/menu"
                    className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                    View Menu
                </Link>
                <Link
                    to="/reserve-table"
                    className="px-8 py-3 border border-border bg-card text-card-foreground font-medium rounded-lg hover:bg-muted transition-colors"
                >
                    Book a Table
                </Link>
            </div>
        </div>
    );
};

export default Landing;

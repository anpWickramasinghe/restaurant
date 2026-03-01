import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
    return (
        <div className="dashboard-layout">
            <aside className="dashboard-sidebar">
                <nav>
                    <Link to="/dashboard">Overview</Link>
                    <Link to="/dashboard/orders">Orders</Link>
                    <Link to="/dashboard/bookings">Bookings</Link>
                    <Link to="/dashboard/reviews">Reviews</Link>
                    <Link to="/dashboard/profile">Profile</Link>
                </nav>
            </aside>
            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;

import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();

    return (
        <div className="success-page">
            <h2>Order Successful!</h2>
            <p>Your order #{orderId} has been placed successfully.</p>
            <Link to="/dashboard/orders">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;

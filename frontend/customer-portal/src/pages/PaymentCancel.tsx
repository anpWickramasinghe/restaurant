import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancel: React.FC = () => {
    return (
        <div className="payment-cancel-page">
            <h2>Payment Cancelled</h2>
            <p>Your payment process was cancelled.</p>
            <Link to="/checkout">Return to Checkout</Link>
        </div>
    );
};

export default PaymentCancel;

import React from 'react';
import { Link } from 'react-router-dom';

const PaymentReturn: React.FC = () => {
    return (
        <div className="payment-return-page">
            <h2>Payment Successful</h2>
            <p>Thank you for your purchase.</p>
            <Link to="/">Return to Home</Link>
        </div>
    );
};

export default PaymentReturn;

import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
    const { items } = useCart();
    const navigate = useNavigate();

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <p>You have {items.length} items in your cart.</p>
            <button onClick={() => navigate('/payment/checkout')}>Proceed to Payment</button>
        </div>
    );
};

export default Checkout;

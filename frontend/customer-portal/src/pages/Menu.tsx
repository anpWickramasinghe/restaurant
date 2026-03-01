import React from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const Menu: React.FC = () => {
    const { addItem } = useCart();

    const handleAddToCart = () => {
        addItem({ id: 1, name: 'Sample Item', price: 10 });
        toast.success('Item added to cart!');
    };

    return (
        <div className="menu-page">
            <h2>Our Menu</h2>
            <div className="menu-item">
                <h3>Sample Dish</h3>
                <p>$10.00</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default Menu;

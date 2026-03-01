import React, { createContext, useContext, useState } from 'react';

interface CartContextType {
    items: any[];
    addItem: (item: any) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<any[]>([]);

    const addItem = (item: any) => setItems((prev) => [...prev, item]);
    const clearCart = () => setItems([]);

    return (
        <CartContext.Provider value={{ items, addItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

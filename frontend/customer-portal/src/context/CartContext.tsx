import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

export interface CartItem {
  id: string; // unique key for item + options
  menuItemId?: string; // reference to menu item
  title: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
  size?: string;
  extras?: { id: string; name: string; price: number }[];
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  lastAddedItem: CartItem | null;
  cartAnimationTrigger: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => useContext(CartContext)!;

const CART_STORAGE_KEY = "customer_cart";

// Helper function to load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
  }
  return [];
};

export const CartProvider = ({ children }: { children: any }) => {
  // Initialize cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [cartAnimationTrigger, setCartAnimationTrigger] = useState(0);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log("[CartContext] cart state changed:", cart);
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  const addToCart = useCallback((item: CartItem) => {
    console.log("[CartContext] addToCart called with:", item);

    // Set the last added item for animation purposes
    setLastAddedItem(item);
    // Trigger cart animation
    setCartAnimationTrigger((prev) => prev + 1);

    setCart((prev) => {
      // Check if same item + options already exist
      const existing = prev.find(
        (i) =>
          i.title === item.title &&
          i.size === item.size &&
          JSON.stringify(i.extras) === JSON.stringify(item.extras)
      );

      if (existing) {
        console.log(
          "[CartContext] Updating quantity for existing item:",
          existing
        );
        // Update quantity of existing item
        return prev.map((i) =>
          i.id === existing.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      // Add new item with unique ID
      const newItem = {
        ...item,
        id: item.id || `${Date.now()}-${Math.random()}`,
      };
      console.log("[CartContext] Adding new item:", newItem);
      return [...prev, newItem];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart(
      (prev) =>
        prev
          .map((i) => {
            if (i.id === id) {
              const newQuantity = Math.max(0, i.quantity + delta);
              return { ...i, quantity: newQuantity };
            }
            return i;
          })
          .filter((i) => i.quantity > 0) // Remove items with 0 quantity
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        lastAddedItem,
        cartAnimationTrigger,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

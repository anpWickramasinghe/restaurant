import { authService } from "./authService";

const BACKEND_URL =
  import.meta.env.VITE_API_GATEWAY_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:4000";

/**
 * Example: Get customer profile
 */
export async function getCustomerProfile() {
  const user = authService.getUser();
  if (!user) {
    throw new Error("No user logged in");
  }

  const response = await authService.authenticatedFetch(
    `${BACKEND_URL}/customers/${user.email}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
}

/**
 * Example: Update customer preferences
 */
export async function updateCustomerPreferences(preferences: {
  dietaryRestrictions?: string[];
  favoriteItems?: string[];
  allergies?: string[];
}) {
  const user = authService.getUser();
  if (!user) {
    throw new Error("No user logged in");
  }

  const response = await authService.authenticatedFetch(
    `${BACKEND_URL}/customers/${user.email}/preferences`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update preferences");
  }

  return response.json();
}

/**
 * Example: Get menu items (public endpoint, but with auth for personalization)
 */
export async function getMenuItems(search?: string) {
  const isAuthenticated = authService.isAuthenticated();
  const queryParams = search ? `?search=${encodeURIComponent(search)}` : "";

  if (isAuthenticated) {
    // Authenticated request - may include personalized recommendations
    const response = await authService.authenticatedFetch(
      `${BACKEND_URL}/menu${queryParams}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch menu");
    }

    return response.json();
  } else {
    // Public request
    const response = await fetch(`${BACKEND_URL}/menu${queryParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch menu");
    }

    return response.json();
  }
}

/**
 * Cart API functions
 */

export interface CartItem {
  _id?: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  extras?: { id: string; name: string; price: number }[];
  itemTotal: number;
}

export interface Cart {
  _id: string;
  customerEmail: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Get customer's cart (authenticated)
 */
export async function getCart(): Promise<Cart> {
  const response = await authService.authenticatedFetch(`${BACKEND_URL}/cart`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
}

/**
 * Add item to cart (authenticated)
 */
export async function addItemToCart(item: {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  extras?: { id: string; name: string; price: number }[];
}): Promise<Cart> {
  const response = await authService.authenticatedFetch(
    `${BACKEND_URL}/cart/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add item to cart");
  }

  return response.json();
}

/**
 * Update cart item quantity (authenticated)
 */
export async function updateCartItem(
  itemId: string,
  quantity: number
): Promise<Cart> {
  const response = await authService.authenticatedFetch(
    `${BACKEND_URL}/cart/items/${itemId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update cart item");
  }

  return response.json();
}

/**
 * Remove item from cart (authenticated)
 */
export async function removeCartItem(itemId: string): Promise<Cart> {
  const response = await authService.authenticatedFetch(
    `${BACKEND_URL}/cart/items/${itemId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove cart item");
  }

  return response.json();
}

/**
 * Clear entire cart (authenticated)
 */
export async function clearCart(): Promise<Cart> {
  const response = await authService.authenticatedFetch(`${BACKEND_URL}/cart`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to clear cart");
  }

  return response.json();
}

/**
 * Get customer's reservations (public endpoint with email)
 */
export async function getCustomerReservations(email: string) {
  const response = await fetch(`${BACKEND_URL}/reservations/email/${email}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch reservations");
  }

  const data = await response.json();
  return data.reservations;
}

/**
 * Order API functions
 */

export interface OrderItem {
  menuItemId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  extras?: { id: string; name: string; price: number }[];
}

export interface CreateOrderData {
  type: "dine-in" | "take-away" | "takeaway" | "delivery" | "pre-order";
  items: OrderItem[];
  totalAmount: number;
  customerName?: string;
  contactPhone?: string;
  deliveryAddress?: {
    street?: string;
    city?: string;
    postalCode?: string;
    notes?: string;
  };
  paymentMethod?: "cash" | "card" | "online";
  specialNotes?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  type: string;
  status: string;
  items: OrderItem[];
  totalAmount: number;
  customerName?: string;
  customerId?: string;
  customerEmail?: string;
  contactPhone?: string;
  deliveryAddress?: {
    street?: string;
    city?: string;
    postalCode?: string;
    notes?: string;
  };
  paymentStatus: string;
  paymentMethod: string;
  orderSource: string;
  specialNotes?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create a new order (authenticated)
 */
export async function createOrder(orderData: CreateOrderData): Promise<Order> {
  const response = await authService.authenticatedFetch(
    `${BACKEND_URL}/customer/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    }
  );

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Failed to create order" }));
    throw new Error(error.message || "Failed to create order");
  }

  return response.json();
}

/**
 * Get current customer's orders (authenticated)
 */
export async function getCustomerOrders(status?: string): Promise<Order[]> {
  const params = status ? `?status=${encodeURIComponent(status)}` : "";
  const response = await authService.authenticatedFetch(
    `${BACKEND_URL}/customer/orders/my${params}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Failed to fetch orders" }));
    throw new Error(error.message || "Failed to fetch orders");
  }

  return response.json();
}

/**
 * Payment data for PayHere checkout
 */
export interface PaymentData {
  merchant_id: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  order_id: string;
  items: string;
  currency: string;
  amount: string;
  hash: string;
}

/**
 * Prepare payment data for PayHere (authenticated)
 */
export async function preparePayment(
  orderId: string
): Promise<{
  paymentData: PaymentData;
  order: { id: string; orderNumber: string; totalAmount: number };
}> {
  const response = await authService.authenticatedFetch(
    `${BACKEND_URL}/customer/payment/prepare/${orderId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Failed to prepare payment" }));
    throw new Error(error.message || "Failed to prepare payment");
  }

  return response.json();
}

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CartItem, User, Address, Order } from '../types';
import { Product } from '../types';

interface AppContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  user: User | null;
  login: (phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (name: string, email?: string) => void;
  isAuthenticated: boolean;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('noomko-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedUser = localStorage.getItem('noomko-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedRecentlyViewed = localStorage.getItem('noomko-recently-viewed');
    if (savedRecentlyViewed) {
      setRecentlyViewed(JSON.parse(savedRecentlyViewed));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('noomko-cart', JSON.stringify(cart));
  }, [cart]);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('noomko-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('noomko-user');
    }
  }, [user]);

  // Save recently viewed to localStorage
  useEffect(() => {
    localStorage.setItem('noomko-recently-viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === item.product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === item.product.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const login = async (phone: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    if (password.length >= 4) {
      const mockUser: User = {
        phone,
        name: 'Customer',
        email: '',
        addresses: [],
        orders: [],
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('noomko-user');
  };

  const updateUserProfile = (name: string, email?: string) => {
    if (!user) return;
    setUser({
      ...user,
      name,
      email: email || user.email,
    });
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddress: Address = {
      ...address,
      id: Date.now().toString(),
    };
    setUser({
      ...user,
      addresses: [...user.addresses, newAddress],
    });
  };

  const updateAddress = (id: string, addressUpdate: Partial<Address>) => {
    if (!user) return;
    setUser({
      ...user,
      addresses: user.addresses.map((addr) =>
        addr.id === id ? { ...addr, ...addressUpdate } : addr
      ),
    });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    setUser({
      ...user,
      addresses: user.addresses.filter((addr) => addr.id !== id),
    });
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;
    const now = new Date().toISOString();
    const orderNumber = `NO${Date.now().toString().slice(-8)}`;
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderNumber,
      createdAt: now,
      updatedAt: now,
    };
    setUser({
      ...user,
      orders: [newOrder, ...user.orders],
    });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    if (!user) return;
    setUser({
      ...user,
      orders: user.orders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date().toISOString() }
          : order
      ),
    });
  };

  const addRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === product.id);
      if (existingIndex !== -1) {
        const updatedList = [...prev];
        updatedList.splice(existingIndex, 1);
        return [product, ...updatedList];
      }
      return [product, ...prev];
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        user,
        login,
        logout,
        updateUserProfile,
        isAuthenticated: !!user,
        addAddress,
        updateAddress,
        deleteAddress,
        addOrder,
        updateOrderStatus,
        recentlyViewed,
        addRecentlyViewed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
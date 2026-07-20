import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('wx_cart');
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  const persist = (newItems) => {
    setItems(newItems);
    localStorage.setItem('wx_cart', JSON.stringify(newItems));
  };

  const addToCart = (product, plan) => {
    const key = `${product.id}_${plan.id}`;
    const existing = items.find((i) => i.key === key);

    if (existing) {
      persist(items.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i)));
    } else {
      persist([...items, { key, product, plan, qty: 1 }]);
    }
  };

  const removeFromCart = (key) => persist(items.filter((i) => i.key !== key));

  const updateQty = (key, qty) => {
    if (qty < 1) return removeFromCart(key);
    persist(items.map((i) => (i.key === key ? { ...i, qty } : i)));
  };

  const clearCart = () => persist([]);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.plan.monthlyPrice * item.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

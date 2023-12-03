import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("EphronCart"));
    if (savedCart) {
      setItems(savedCart);
    }
  }, []);

  const addItem = (item) => {
    const itemIndex = items.findIndex((i) => i.id === item.id);
    if (itemIndex >= 0) {
      const newItems = [...items];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        quantity: newItems[itemIndex].quantity + (item.quantity || 1),
      };
      setItems(newItems);
      localStorage.setItem("EphronCart", JSON.stringify(newItems));
      toast.success(`Added ${item.name} to cart`);
    } else {
      setItems([...items, { ...item, quantity: item.quantity || 1 }]);
      localStorage.setItem(
        "EphronCart",
        JSON.stringify([
          ...items,
          { ...item, cartQuantity: item.cartQuantity || 1 },
        ])
      );
      toast.success(`Added ${item.name} to cart`);
    }
  };

  const updateQuantity = (id, quantity) => {
    const itemIndex = items.findIndex((i) => i.id === id);
    if (itemIndex >= 0) {
      const newItems = [...items];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        quantity: quantity,
      };
      setItems(newItems);
      localStorage.setItem("EphronCart", JSON.stringify(newItems));
      toast.success(
        `Updated quantity of ${newItems[itemIndex].name} to ${quantity}`
      );
    }
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    localStorage.setItem(
      "EphronCart",
      JSON.stringify(items.filter((item) => item.id !== id))
    );
    toast.success(`Removed item with ID ${id} from cart`);
  };

  const isInCart = (id) => {
    return items.some((item) => item.id === id);
  };

  const clearCart = () => {
    setItems([]);
    localStorage.setItem("EphronCart", JSON.stringify([]));
    toast.success("Cart cleared!");
  };

  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    isInCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

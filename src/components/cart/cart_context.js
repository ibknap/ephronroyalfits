import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("ephronCart"));
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
        cartQuantity:
          newItems[itemIndex].cartQuantity + (item.cartQuantity || 1),
      };
      setItems(newItems);
      localStorage.setItem("ephronCart", JSON.stringify(newItems));
      toast.success("Added to cart");
    } else {
      setItems([...items, { ...item, cartQuantity: item.cartQuantity || 1 }]);
      localStorage.setItem(
        "ephronCart",
        JSON.stringify([
          ...items,
          { ...item, cartQuantity: item.cartQuantity || 1 },
        ])
      );
      toast.success("Added to cart");
    }
  };

  const getItem = (item) => {
    const itemIndex = items.findIndex((i) => i.id === item.id);
    return items[itemIndex];
  };

  const updateQuantity = (id, cartQuantity) => {
    const itemIndex = items.findIndex((i) => i.id === id);
    if (itemIndex >= 0) {
      const newItems = [...items];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        cartQuantity: cartQuantity,
      };
      setItems(newItems);
      localStorage.setItem("ephronCart", JSON.stringify(newItems));
      toast.success("Updated cart");
    }
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    localStorage.setItem(
      "ephronCart",
      JSON.stringify(items.filter((item) => item.id !== id))
    );
    toast.success("Removed from cart");
  };

  const isInCart = (id) => {
    return items.some((item) => item.id === id);
  };

  const clearCart = () => {
    setItems([]);
    localStorage.setItem("ephronCart", JSON.stringify([]));
    toast.success("cart has been cleared");
  };

  const value = {
    items,
    addItem,
    getItem,
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

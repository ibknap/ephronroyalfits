import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        const itemIndex = items.findIndex((i) => i.id === item.id);
        if (itemIndex >= 0) {
            const newItems = [...items];
            newItems[itemIndex] = {
                ...newItems[itemIndex],
                quantity: newItems[itemIndex].quantity + (item.quantity || 1),
            };
            setItems(newItems);
            toast.success(`Added ${item.name} to cart`);
        } else {
            setItems([...items, { ...item, quantity: item.quantity || 1 }]);
            toast.success(`Added ${item.name} to cart`);
        }
    };

    const updateQuantity = (id, quantity) => {
        const itemIndex = items.findIndex((i) => i.id === id);
        if (itemIndex >= 0) {
            const newItems = [...items];
            newItems[itemIndex] = {
                ...newItems[itemIndex],
                quantity: quantity
            };
            setItems(newItems);
            toast.success(`Updated quantity of ${newItems[itemIndex].name} to ${quantity}`);
        }
    };

    const removeItem = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        toast.success(`Removed item with ID ${id} from cart`);
    }

    const value = { items, addItem, updateQuantity, removeItem };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() { return useContext(CartContext) }

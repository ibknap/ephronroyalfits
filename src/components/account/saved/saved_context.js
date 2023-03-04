import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const SavedContext = createContext();

export function SavedProvider({ children }) {
    const [savedItems, setSavedItems] = useState([]);

    const addSavedItem = (item) => {
        if (!savedItems.some((savedItem) => savedItem.id === item.id)) {
            setSavedItems((prevSavedItems) => [...prevSavedItems, item]);
            toast.success(`Added ${item.name} to saved`);
        } else {
            toast.warning('Item is already saved!');
        }
    };

    const removeSavedItem = (id) => {
        setSavedItems((prevItems) => prevItems.filter((item) => item.id !== id));
        toast.success(`Removed item with ID ${id} from saved`);
    };

    const value = { savedItems, addSavedItem, removeSavedItem };

    return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved() { return useContext(SavedContext); }
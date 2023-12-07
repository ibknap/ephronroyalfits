import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const SavedContext = createContext();

export function SavedProvider({ children }) {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("ephronSaved"));
    if (savedProducts) {
      setSavedItems(savedProducts);
    }
  }, []);

  const addSavedItem = (item) => {
    setSavedItems([...savedItems, { ...item, addedOn: new Date() }]);
    localStorage.setItem(
      "ephronSaved",
      JSON.stringify([...savedItems, { ...item, addedOn: new Date() }])
    );
    toast.success("Product saved");
  };

  const removeSavedItem = (id) => {
    setSavedItems(savedItems.filter((item) => item.id !== id));
    localStorage.setItem(
      "ephronSaved",
      JSON.stringify(savedItems.filter((item) => item.id !== id))
    );
    toast.success("Product removed from saved");
  };

  const isInSaved = (id) => {
    return savedItems.some((item) => item.id === id);
  };

  const value = { savedItems, addSavedItem, removeSavedItem, isInSaved };

  return (
    <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
  );
}

export function useSaved() {
  return useContext(SavedContext);
}

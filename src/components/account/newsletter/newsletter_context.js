import { createContext, useContext, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/fire_config";
import { toast } from "react-toastify";

const NewsletterContext = createContext();

export function NewsletterProvider({ children }) {
    const [subscribed, setSubscribed] = useState(false);

    const subscribe = async (email) => {
        if (!auth.currentUser) {
            toast.error("You must be signed in to subscribe to the newsletter");
            return;
        }

        try {
            const newsletterRef = doc(db, "newsletterSubscribers", email);
            const newsletter = await getDoc(newsletterRef);

            if (newsletter.exists() && newsletter.subscribed == true) {
                toast.warning(`${email} is already subscribed to newsletter.`);
            } else {
                await setDoc(doc(db, "newsletterSubscribers", email), {
                    email,
                    subscribed: true,
                });
                setSubscribed(true);
                toast.success(`${email} subscribed.`);
            }
        } catch (error) {
            toast.error(`Error subscribing to newsletter: ${error}`);
        }
    };

    const unsubscribe = async (email) => {
        if (!auth.currentUser) {
            toast.error("You must be signed in to unsubscribe from the newsletter");
            return;
        }

        try {
            const newsletterRef = doc(db, "newsletterSubscribers", email);
            const newsletter = await getDoc(newsletterRef);

            if (!newsletter.exists()) {
                toast.warning(`${email} not subscribed, subscribed first.`);
            } else {
                await setDoc(doc(db, "newsletterSubscribers", email), {
                    email,
                    subscribed: false,
                });
                setSubscribed(false);
                toast.success(`${email} unsubscribed.`);
            }
        } catch (error) {
            toast.error(`Error unsubscribing from newsletter: ${error}`);
        }
    };

    const value = { subscribed, subscribe, unsubscribe };

    return <NewsletterContext.Provider value={value}>{children}</NewsletterContext.Provider>;
};

export function useNewsletter() { return useContext(NewsletterContext); }
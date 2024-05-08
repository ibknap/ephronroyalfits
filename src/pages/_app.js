import { useEffect } from "react";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "@/components/cart/cart_context";
import { SavedProvider } from "@/components/account/saved/saved_context";
import { FireAuthProvider } from "@/firebase/fire_auth_context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Julius_Sans_One } from "next/font/google";

const font = Julius_Sans_One({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <FireAuthProvider>
      <CartProvider>
        <SavedProvider>
          <main className={font.className}>
            <Component {...pageProps} />
            <ToastContainer position="bottom-left" autoClose={3000} />
          </main>
        </SavedProvider>
      </CartProvider>
    </FireAuthProvider>
  );
}

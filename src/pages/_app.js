import { useEffect } from "react";
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css' // add bootstrap css
import { CartProvider } from '@/pages/cart/cart_context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  useEffect(() => { require("bootstrap/dist/js/bootstrap.bundle.min.js"); }, []);

  return (
    <CartProvider>
      <Component {...pageProps} />
      <ToastContainer position="bottom-left" autoClose={3000} />
    </CartProvider>
  )
}

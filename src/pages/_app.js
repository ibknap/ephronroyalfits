import { useEffect } from "react";
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css' // add bootstrap css

export default function App({ Component, pageProps }) {
  useEffect(() => {require("bootstrap/dist/js/bootstrap.bundle.min.js");}, []);

  return <Component {...pageProps} />
}

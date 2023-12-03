import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/components/navigation/navbar/Navbar.module.css";
import {
  Bag2,
  CloseSquare,
  Heart,
  Home,
  Menu,
  People,
  ShoppingCart,
  User,
} from "iconsax-react";
import { useAuth } from "@/firebase/fire_auth_context";
import SearchBox from "@/components/search/search";

export default function CollapsedNavbar({ totalCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { loading, authUser, logOut } = useAuth();

  // toggle slide navbar
  const toggleNavbar = () => setIsOpen(!isOpen);

  // toggle live chat
  const liveChat = () => {
    if (typeof window !== "undefined" && window.Tawk_API) {
      window.Tawk_API.toggle();
    }
  };

  return (
    <>
      <div className="container fixed-top bg-white">
        <div className="row justify-content-between">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center py-3">
              <Link className="navbar-brand" href="/">
                <img
                  src="/logo/png/logo_long_trans.png"
                  alt="logo"
                  className="rounded"
                  width={118}
                />
              </Link>
              <div className="d-flex">
                <Link
                  className={`nav-link ${
                    router.asPath == "/cart"
                      ? "nav-link primary bg_grey rounded"
                      : "text-dark"
                  }`}
                  href="/cart"
                >
                  <ShoppingCart className="me-1" variant="Bulk" />
                  <span className={styles.show_nav_text}>Cart</span>
                  <span className="ms-2 text-danger fw-bold">{totalCart}</span>
                </Link>
                <Menu
                  className={`mx-3 ${styles.toggler}`}
                  variant="Bulk"
                  onClick={toggleNavbar}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* overlay */}
      {isOpen && (
        <div
          className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
          onClick={toggleNavbar}
        />
      )}

      {/* collapsed navbar */}
      <nav
        className={`${styles.collapsed_navbar} ${
          isOpen ? styles.collapsed_open : ""
        }`}
      >
        <div className={styles.collapsed_container}>
          <CloseSquare
            className={`m-2 ${styles.toggler}`}
            onClick={toggleNavbar}
          />

          <ul className={styles.collapsed_menu}>
            <li className={`my-2 ${styles.collapsed_menu_header}`}>
              Ephron Royal Fit's
            </li>
            <li className="my-2">
              <Link className={styles.dropdown_item} href="/">
                <span className="d-flex ">
                  <Home className="mx-1" variant="Bulk" />
                  Home
                </span>
              </Link>
            </li>
            {!loading && authUser && (
              <>
                <li className={`my-2 ${styles.collapsed_menu_header}`}>
                  Account
                </li>
                <li className="my-2">
                  <Link className={styles.dropdown_item} href="/account">
                    <span className="d-flex ">
                      <User className="mx-1" variant="Bulk" />
                      My Account
                    </span>
                  </Link>
                </li>
                <li className="my-2">
                  <Link className={styles.dropdown_item} href="/account/donate">
                    <span className="d-flex ">
                      <Bag2 className="mx-1" variant="Bulk" />
                      My Donations
                    </span>
                  </Link>
                </li>
                <li className="my-2">
                  <Link className={styles.dropdown_item} href="/account/saved">
                    <span className="d-flex ">
                      <Heart className="mx-1" variant="Bulk" />
                      Saved Items
                    </span>
                  </Link>
                </li>
              </>
            )}
            <li className="my-2">
              {!loading && authUser ? (
                <button
                  className={`dropdown-item btn btn-success ${styles.btn_nav} text-center white shadow-sm px-3 py-2`}
                  onClick={logOut}
                >
                  Log Out
                </button>
              ) : (
                <Link
                  className={`dropdown-item btn btn-success ${styles.btn_nav} text-center white shadow-sm px-3 py-2`}
                  href="/auth/signin"
                >
                  Sign In
                </Link>
              )}
            </li>
            <li className={`my-2 ${styles.collapsed_menu_header}`}>Help</li>
            <li className="my-2">
              <Link className={styles.dropdown_item} href="/help_center">
                <span className="d-flex ">
                  <People className="mx-1" variant="Bulk" />
                  Help Center
                </span>
              </Link>
            </li>
            <li className="my-2">
              <a
                className={`dropdown-item btn btn-success ${styles.btn_nav} text-center white shadow-sm px-3 py-2`}
                href="#!"
                onClick={liveChat}
              >
                Live Chat
              </a>
            </li>
            <li className="my-2 text-center">
              <Link className="grey_dark text-decoration-none" href="/">
                All rights reserved © www.ephronroyalfits.com
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

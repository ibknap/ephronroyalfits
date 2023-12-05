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
  SearchNormal1,
  ShoppingCart,
  User,
} from "iconsax-react";
import { useAuth } from "@/firebase/fire_auth_context";

export default function CollapsedNavbar({ totalCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { loading, authUser, logOut } = useAuth();

  // toggle slide navbar
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="container fixed-top bg-white">
        <div className="row justify-content-between">
          <div className="col px-2">
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
                <button className="btn nav-link me-2">
                  <SearchNormal1 variant="Bulk" />
                </button>

                <Link
                  className={`nav-link me-2 ${
                    router.asPath == "/cart"
                      ? "nav-link primary bg_grey rounded"
                      : "text-dark"
                  }`}
                  href="/cart"
                >
                  <ShoppingCart className="me-1" variant="Bulk" />
                  <span className="text-danger fw-bold">{totalCart}</span>
                </Link>

                <Menu
                  className="pointer"
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
          <CloseSquare className="pointer mt-3" onClick={toggleNavbar} />

          <ul className={styles.collapsed_menu}>
            <li className={`pb-1 pt-2 ${styles.collapsed_menu_header}`}>
              Ephron Royal &apos;fits
            </li>

            <li className="my-2">
              <Link className={styles.dropdown_item} href="/">
                <Home className="me-1" variant="Bulk" />
                Home
              </Link>
            </li>

            {!loading && !authUser && (
              <>
                <li className={`pb-1 pt-2 ${styles.collapsed_menu_header}`}>
                  Account
                </li>

                <li className="my-2">
                  <Link className={styles.dropdown_item} href="/account">
                    <User className="me-1" variant="Bulk" />
                    My Account
                  </Link>
                </li>

                <li className="my-2">
                  <Link className={styles.dropdown_item} href="/account/order">
                    <Bag2 className="me-1" variant="Bulk" />
                    My Orders
                  </Link>
                </li>

                <li className="my-2">
                  <Link className={styles.dropdown_item} href="/account/saved">
                    <Heart className="me-1" variant="Bulk" />
                    Saved Items
                  </Link>
                </li>

                <li className={`p-0 ${styles.collapsed_menu_header}`} />
              </>
            )}

            <li className="my-2">
              <Link
                className={styles.dropdown_item}
                href="https://wa.me/+2347063869144?text=I am contacting you from site to request for..."
                target="_blank"
              >
                <People className="me-1" variant="Bulk" />
                <span className={styles.show_nav_text}>Contact Us</span>
              </Link>
            </li>

            <li className="my-2">
              {!loading && authUser ? (
                <button
                  className={`dropdown-item btn ${styles.btn_nav} shadow-sm px-3 py-2`}
                  onClick={logOut}
                >
                  Log Out
                </button>
              ) : (
                <Link
                  className={`dropdown-item btn ${styles.btn_nav} shadow-sm px-3 py-2`}
                  href="/auth/signin"
                >
                  Sign In
                </Link>
              )}
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

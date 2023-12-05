import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/components/navigation/navbar/Navbar.module.css";
import {
  ArrowDown3,
  Bag2,
  Heart,
  People,
  SearchNormal1,
  ShoppingCart,
  User,
} from "iconsax-react";
import { useAuth } from "@/firebase/fire_auth_context";

export default function UnCollapsedNavbar({ totalCart }) {
  const router = useRouter();
  const { loading, authUser, logOut } = useAuth();

  return (
    <>
      <nav
        className={`${styles.navbar} navbar navbar-expand-md navbar-light fixed-top`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <img
              src="/logo/svg/logo_long_trans.svg"
              alt="logo"
              className="rounded"
              width={150}
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav" />

            <ul className="d-flex navbar-nav">
              <li className="nav-item">
                <button className="btn nav-link">
                  <SearchNormal1 variant="Bulk" />
                </button>
              </li>

              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className={styles.dropdown}
                    type="button"
                    id="accountMenu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="d-flex ">
                      <User className="me-1" variant="Bulk" />
                      <span className={styles.show_nav_text}>Account</span>
                      <ArrowDown3 size="16" className="me-1" variant="Bulk" />
                    </span>
                  </button>
                  <ul
                    className="dropdown-menu rounded-0"
                    aria-labelledby="accountMenu"
                  >
                    {!loading && !authUser && (
                      <>
                        <li className="m-2 mt-0">
                          <Link
                            className={styles.dropdown_item}
                            href="/account"
                          >
                            <User className="me-1" variant="Bulk" />
                            <span className={styles.show_nav_text}>
                              My Account
                            </span>
                          </Link>
                        </li>

                        <li className="m-2">
                          <Link
                            className={styles.dropdown_item}
                            href="/account/orders"
                          >
                            <Bag2 className="me-1" variant="Bulk" />
                            <span className={styles.show_nav_text}>
                              My Orders
                            </span>
                          </Link>
                        </li>

                        <li className="m-2">
                          <Link
                            className={styles.dropdown_item}
                            href="/account/saved"
                          >
                            <Heart className="me-1" variant="Bulk" />
                            <span className={styles.show_nav_text}>
                              Saved Items
                            </span>
                          </Link>
                        </li>

                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                      </>
                    )}

                    <li className="m-2">
                      <Link
                        className={styles.dropdown_item}
                        href="https://wa.me/+2347063869144?text=I am contacting you from site to request for..."
                        target="_blank"
                      >
                        <People className="me-1" variant="Bulk" />
                        <span className={styles.show_nav_text}>Contact Us</span>
                      </Link>
                    </li>

                    <li className="m-2 mb-0">
                      {!loading && !authUser ? (
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
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link rounded-0 ${
                    router.asPath == "/cart"
                      ? "nav-link primary bg_grey rounded"
                      : "text-dark"
                  } position-relative`}
                  href="/cart"
                >
                  <ShoppingCart className="me-1" variant="Bulk" />
                  <span className={styles.show_nav_text}>Cart</span>
                  <span className="ms-2 text-danger fw-bold">{totalCart}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

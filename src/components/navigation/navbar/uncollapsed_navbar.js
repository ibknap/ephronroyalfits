import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/components/navigation/navbar/Navbar.module.css";
import {
  ArrowDown3,
  Bag2,
  Heart,
  People,
  ShoppingCart,
  User,
  Warning2,
} from "iconsax-react";
import { useAuth } from "@/firebase/fire_auth_context";
import SearchBox from "@/components/search/search";

export default function UnCollapsedNavbar({ totalCart }) {
  const router = useRouter();
  const { loading, authUser, logOut } = useAuth();

  // toggle live chat
  const liveChat = () => {
    if (typeof window !== "undefined" && window.Tawk_API) {
      window.Tawk_API.toggle();
    }
  };

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
            <SearchBox />

            <ul className="d-flex navbar-nav ">
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
                      <User className="mx-1" variant="Bulk" />
                      <span className={styles.show_nav_text}>Account</span>
                      <ArrowDown3 size="16" className="mx-1" variant="Bulk" />
                    </span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="accountMenu">
                    <li className="m-2">
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
                    {!loading && authUser && (
                      <>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li className="m-2">
                          <Link
                            className={styles.dropdown_item}
                            href="/account"
                          >
                            <span className="d-flex ">
                              <User className="mx-1" variant="Bulk" />
                              <span className={styles.show_nav_text}>
                                My Account
                              </span>
                            </span>
                          </Link>
                        </li>
                        <li className="m-2">
                          <Link
                            className={styles.dropdown_item}
                            href="/account/donate"
                          >
                            <span className="d-flex ">
                              <Bag2 className="mx-1" variant="Bulk" />
                              <span className={styles.show_nav_text}>
                                My Donations
                              </span>
                            </span>
                          </Link>
                        </li>
                        <li className="m-2">
                          <Link
                            className={styles.dropdown_item}
                            href="/account/saved"
                          >
                            <span className="d-flex ">
                              <Heart className="mx-1" variant="Bulk" />
                              <span className={styles.show_nav_text}>
                                Saved Items
                              </span>
                            </span>
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className={styles.dropdown}
                    type="button"
                    id="helpMenu"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="d-flex ">
                      <Warning2 className="mx-1" variant="Bulk" />
                      <span className={styles.show_nav_text}>Help</span>
                      <ArrowDown3 size="16" className="mx-1" variant="Bulk" />
                    </span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="helpMenu">
                    <li className="m-2">
                      <Link
                        className={styles.dropdown_item}
                        href="/help_center"
                      >
                        <span className="d-flex ">
                          <People className="mx-1" variant="Bulk" />
                          <span className={styles.show_nav_text}>
                            Help Center
                          </span>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="m-2">
                      <a
                        className={`dropdown-item btn btn-success ${styles.btn_nav} text-center white shadow-sm px-3 py-2`}
                        href="#!"
                        onClick={liveChat}
                      >
                        Live Chat
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    router.asPath == "/cart"
                      ? "nav-link primary bg_grey rounded"
                      : "text-dark"
                  } position-relative`}
                  href="/cart"
                >
                  <ShoppingCart className="me-1" variant="Bulk" />
                  <span className={styles.show_nav_text}>Cart</span>
                  <span className="ms-2 text-danger fw-bold">
                    {totalCart}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/components/navigation/navbar/Navbar.module.css";
import { ArrowDown3, Bag2, Menu, SearchNormal1, User } from "iconsax-react";
import { useAuth } from "@/firebase/fire_auth_context";
import categories from "@/components/utils/categories";

export default function CollapsedNavbar({ totalCart, emitShowSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { loading, authUser, logOut } = useAuth();

  // toggle slide navbar
  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="container fixed-top bg-white">
        <div className="row justify-content-between">
          <div className="col px-2 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <Link className="navbar-brand" href="/">
                <img
                  src="/logo/png/logo_long.png"
                  alt="logo"
                  className="rounded"
                  width={118}
                />
              </Link>

              <div className="d-flex align-items-center">
                <button
                  onClick={() => emitShowSearch(true)}
                  className="btn nav-link me-2"
                >
                  <SearchNormal1 className="black" variant="Bold" />
                </button>

                <Link
                  className={`nav-link nav-link-none me-2 ${
                    router.asPath == "/account" ? "blue" : "black"
                  }`}
                  href={!loading && authUser ? "/account" : "/auth/signin"}
                >
                  <User variant="Bulk" />
                </Link>

                <Link
                  className={`nav-link nav-link-none me-2 position-relative ${
                    router.asPath == "/cart" ? "blue" : "black"
                  }`}
                  href="/cart"
                >
                  <Bag2 variant="Bulk" />
                  {parseInt(totalCart) > 0 && (
                    <span
                      class="position-absolute translate-middle bg_blue border border-light rounded-circle"
                      style={{
                        padding: "0.35rem",
                        bottom: "-8px",
                        right: "-8px",
                      }}
                    />
                  )}
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
          <ul className={styles.collapsed_menu}>
            <li className={`mt-3 mb-2 py-2 ${styles.collapsed_menu_header}`}>
              <b>Ephron Royal &apos;fits</b>
            </li>

            <li className="my-2">
              <Link className={styles.dropdown_item} href="/">
                Home
              </Link>
            </li>

            {categories.map((cat) =>
              cat.sub.length > 0 ? (
                <li key={cat.id} className="my-2 blue">
                  <button
                    className="w-100 text-start btn p-0 border-0 rounded-0"
                    type="button"
                    id={`cat${cat.id}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {cat.name} <ArrowDown3 size={12} variant="Bulk" />
                  </button>

                  <ul
                    className="dropdown-menu rounded-0"
                    aria-labelledby={`cat${cat.id}`}
                  >
                    {cat.sub.map((sub, index) => (
                      <li
                        key={sub.id}
                        className={`m-2 ${index === 0 && "mt-0"} ${
                          index === cat.sub.length - 1 && "mb-0"
                        }`}
                      >
                        <Link
                          className={`${styles.dropdown_item} blue d-flex`}
                          href={`/category/${sub.parentId}/${sub.id}`}
                        >
                          <img
                            src={sub.image}
                            alt={sub.name}
                            className="rounded-circle me-2"
                            width={30}
                            height={30}
                            style={{ objectFit: "cover" }}
                          />
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={cat.id} className="my-2">
                  <Link
                    className={styles.dropdown_item}
                    href={`/category/${cat.parentId}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              )
            )}

            <li className="my-2">
              <Link
                className={styles.dropdown_item}
                href={!loading && authUser ? "/account" : "/auth/signin"}
              >
                My Account
              </Link>
            </li>

            <li className={`mb-3 ${styles.collapsed_menu_header}`} />

            <li className="my-2 text-center">
              <Link className="grey_dark text-decoration-none" href="/">
                <small>All rights reserved © www.ephronroyalfits.com</small>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

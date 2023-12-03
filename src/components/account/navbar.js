import styles from "@/components/account/Account.module.css";
import { useMediaQuery } from "@chakra-ui/react";
import { Bag2, HambergerMenu, Heart, User } from "iconsax-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function AccountNavbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const router = useRouter();

  // open and collapse navbar depending on view port
  function showMenuToggler() {
    setShowMenu(!showMenu);
  }

  return (
    <>
      {isMobile && (
        <div className="d-flex justify-content-end">
          <button className="btn btn-sm my-2" onClick={showMenuToggler}>
            Menu <HambergerMenu />
          </button>
        </div>
      )}

      {showMenu || !isMobile ? (
        <div className="col-md-3">
          <div className="m-2 p-2 shadow rounded">
            <ul className="list-unstyled">
              <li
                className={`py-3 rounded ${
                  router.asPath == "/account" ? "bg_primary_50" : ""
                }`}
              >
                <Link
                  className="secondary text-decoration-none"
                  href="/account"
                >
                  <span className="d-flex ">
                    <User className="mx-1" variant="Bulk" />
                    My Account
                  </span>
                </Link>
              </li>
              <li
                className={`py-3 rounded ${
                  router.asPath == "/account/donate" ? "bg_primary_50" : ""
                }`}
              >
                <Link
                  className="secondary text-decoration-none"
                  href="/account/donate"
                >
                  <span className="d-flex ">
                    <Bag2 className="mx-1" variant="Bulk" />
                    My Donations
                  </span>
                </Link>
              </li>
              <li
                className={`py-3 rounded ${
                  router.asPath == "/account/saved" ? "bg_primary_50" : ""
                }`}
              >
                <Link
                  className="secondary text-decoration-none"
                  href="/account/saved"
                >
                  <span className="d-flex ">
                    <Heart className="mx-1" variant="Bulk" />
                    Saved Items
                  </span>
                </Link>
              </li>
              <hr />
              <li className="p-2">
                <button
                  type="button"
                  className="w-100 text-start secondary trans border_none"
                  data-bs-toggle="modal"
                  data-bs-target="#addressBookModal"
                >
                  Address Book
                </button>
              </li>
              <li className="p-2">
                <button
                  type="button"
                  className="w-100 text-start secondary trans border_none"
                  data-bs-toggle="modal"
                  data-bs-target="#newsletterModal"
                >
                  Newsletter
                </button>
              </li>
              <li className="mt-2">
                <hr />
                <Link
                  className={`w-100 btn btn-success ${styles.btn_nav} text-center white shadow-sm py-3`}
                  href="#"
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

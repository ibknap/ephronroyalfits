import { useMediaQuery } from "@chakra-ui/react";
import { Bag2, HambergerMenu, Heart, User } from "iconsax-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/firebase/fire_auth_context";

export default function AccountNavbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const router = useRouter();
  const { logOut, authUser } = useAuth();

  // open and collapse navbar depending on view port
  const showMenuToggler = () => setShowMenu(!showMenu);

  return (
    <>
      {isMobile && (
        <div className="d-flex justify-content-end">
          <button className="btn btn-sm my-2" onClick={showMenuToggler}>
            Account Menu <HambergerMenu />
          </button>
        </div>
      )}

      {showMenu || !isMobile ? (
        <div className="col-md-3">
          <div className="m-2 p-2 shadow-sm">
            <ul className="list-unstyled">
              {authUser && (
                <li
                  className={`p-2 ${
                    router.asPath == "/dashboard/orders" && "bg_primary_50"
                  }`}
                >
                  <Link
                    className="text-dark text-decoration-none"
                    href="/dashboard/orders"
                  >
                    <User className="me-2" variant="Bulk" />
                    Dashboard
                  </Link>
                </li>
              )}

              <li
                className={`p-2 ${
                  router.asPath == "/account" && "bg_primary_50"
                }`}
              >
                <Link
                  className="text-dark text-decoration-none"
                  href="/account"
                >
                  <User className="me-2" variant="Bulk" />
                  My Account
                </Link>
              </li>
              <li
                className={`p-2 ${
                  router.asPath == "/account/orders" && "bg_primary_50"
                }`}
              >
                <Link
                  className="text-dark text-decoration-none"
                  href="/account/orders"
                >
                  <Bag2 className="me-2" variant="Bulk" />
                  My Orders
                </Link>
              </li>
              <li
                className={`p-2 ${
                  router.asPath == "/account/saved" && "bg_primary_50"
                }`}
              >
                <Link
                  className="text-dark text-decoration-none"
                  href="/account/saved"
                >
                  <Heart className="me-2" variant="Bulk" />
                  Saved Items
                </Link>
              </li>

              <hr />

              <li>
                <button
                  type="button"
                  className="w-100 p-2 btn-lg bg_primary border-0 trans text-start"
                  data-bs-toggle="modal"
                  data-bs-target="#addressBookModal"
                >
                  Address Book
                </button>
              </li>

              <li className="mt-2">
                <hr />
                <button
                  onClick={logOut}
                  className="btn rounded-0 border-0 bg_primary white w-100 py-3"
                >
                  Sign Out
                </button>
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

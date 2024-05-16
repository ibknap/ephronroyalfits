import { Box1, DirectInbox, Folder, Logout, People, ShoppingBag } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/firebase/fire_auth_context";

export default function Sidebar() {
  const router = useRouter();
  const { logOut } = useAuth();

  return (
    <div className="dashboard_sidebar">
      <nav className="d-flex flex-column">
        <div className="dashboard_sidebar_header">
          <img src="/logo/svg/logo_trans.svg" alt="logo" />
          <div className="d-none d-lg-block text-start">
            Ephron Admin
            <p className="text-muted">
              <small>Royal &apos;fits</small>
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/orders"
          as="/dashboard/orders"
          className={`dashboard_sidebar_item secondary ${
            router.asPath == "/dashboard/orders" && "bg_primary"
          }`}
        >
          <ShoppingBag className="mx-2" />
          <span className="d-none d-lg-inline">Orders</span>
        </Link>

        <Link
          href="/dashboard/products"
          as="/dashboard/products"
          className={`dashboard_sidebar_item secondary ${
            router.asPath == "/dashboard/products" && "bg_primary"
          }`}
        >
          <Box1 className="mx-2" />
          <span className="d-none d-lg-inline">Products</span>
        </Link>

        <Link
          href="/dashboard/users"
          as="/dashboard/users"
          className={`dashboard_sidebar_item secondary ${
            router.asPath == "/dashboard/users" && "bg_primary"
          }`}
        >
          <People className="mx-2" />
          <span className="d-none d-lg-inline">Users</span>
        </Link>

        <Link
          href="/dashboard/contact_us"
          as="/dashboard/contact_us"
          className={`dashboard_sidebar_item secondary ${
            router.asPath == "/dashboard/contact_us" && "bg_primary"
          }`}
        >
          <DirectInbox className="mx-2" />
          <span className="d-none d-lg-inline">Contact Us</span>
        </Link>

        <Link
          href="/"
          as="/"
          className={`dashboard_sidebar_item secondary ${
            router.asPath == "/" && "bg_primary"
          }`}
        >
          <Folder className="mx-2" />
          <span className="d-none d-lg-inline">Go Home</span>
        </Link>

        <button
          type="button"
          className="border-0 trans text-start dashboard_sidebar_item secondary"
          onClick={logOut}
        >
          <Logout className="mx-2" />
          <span className="d-none d-lg-inline">Logout</span>
        </button>
      </nav>
    </div>
  );
}

import styles from "@/components/auth/Auth.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { db } from "@/firebase/fire_config";
import { useState } from "react";
import { useAuth } from "@/firebase/fire_auth_context";
import { toast } from "react-toastify";
import Loader from "@/components/loader/loader";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Information } from "iconsax-react";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authUser, signIn } = useAuth();
  const router = useRouter();

  const onSignin = async (e) => {
    e.preventDefault();
    setLoading(true);

    await signIn(email.toLowerCase(), password)
      .then((data) => {
        const profileRef = doc(db, "users", data.user.email);
        getDoc(profileRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const isUserAdmin = docSnapshot.data().isAdmin;
              const isUserActive = docSnapshot.data().isActive;

              if (!isUserActive) {
                toast.warning("User Has been disabled! contact Ephron");
              } else if (isUserAdmin && isUserActive) {
                Cookies.set("EphronSignedIn", true, { expires: 14 });
                router.push("/dashboard/orders");
                toast.success("Welcome back admin");
              } else {
                Cookies.set("EphronSignedIn", true, { expires: 7 });
                router.push("/account");
                toast.success("User signed in");
              }
            } else toast.error("User not found");
          })
          .catch((e) => {
            toast.error(`Error while getting User data: ${e.message}`);
          });
      })
      .catch((e) => {
        if (e.code === "auth/user-not-found") toast.error("User not found");
        else if (e.code === "auth/invalid-login-credentials") {
          toast.error("Wrong email/password");
        } else if (e.code === "auth/wrong-password") {
          toast.error("Wrong password");
        } else toast.error(`Something is wrong: ${e.message}`);
      })
      .finally(() => setLoading(false));
  };

  if (authUser && Cookies.get("EphronSignedIn")) {
    return (
      <div className="error-page-container">
        <div className="bg">
          <Information variant="Bulk" size={200} />
          <h5>You are already signed in</h5>

          <div className="mt-4">
            <Link
              href="/"
              className="btn btn-lg rounded-0 border-0 bg_primary white"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header className="mb-auto" />

          <div className="px-3 row justify-content-center">
            <div className="col-12">
              <Link href="/">
                <img src="/logo/svg/logo_text_trans.svg" width={200} />
              </Link>
              <h5 className="third">Sign In</h5>
            </div>

            <form className="col-md-4 text-start mt-4 p-0" onSubmit={onSignin}>
              <div className="mb-3">
                <input
                  type="email"
                  required
                  className="form-control rounded-0 py-2"
                  id="emailAddr"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <input
                type="password"
                required
                className="form-control rounded-0 py-2"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="btn btn-lg rounded-0 border-0 bg_primary white w-100 mt-4"
              >
                {loading ? <Loader /> : "Signin"}
              </button>

              <p className="text-center mt-4">
                <Link
                  href="/auth/reset_password"
                  className="text-decoration-none primary me-2"
                >
                  Reset your password
                </Link>
                |
                <Link
                  href="/auth/signup"
                  className="text-decoration-none primary ms-2"
                >
                  signup a new account
                </Link>
              </p>
            </form>
          </div>

          <footer className="mt-auto text-muted">
            For further support, contact
            <Link
              href="https://wa.me/+2347063869144?text=I am contacting you from site to request for..."
              target="_blank"
              className="text-decoration-none primary ms-2"
            >
              us here
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
}

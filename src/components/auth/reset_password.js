import styles from "@/components/auth/Auth.module.css";
import Link from "next/link";
import { auth } from "@/firebase/fire_config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "@/components/loader/loader";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const onForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(
          "An email with a password reset link has been sent to your inbox"
        );
      })
      .catch((e) => toast.error(`Something is wrong: ${e.message}`))
      .finally(() => setLoading(false));
  };

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
              <h5 className="third">Reset Password</h5>
            </div>

            <form
              className="col-md-4 text-start mt-4 p-0"
              onSubmit={onForgotPassword}
            >
              <input
                type="email"
                required
                className="form-control rounded-0 py-2"
                id="emailAddr"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="btn btn-lg rounded-0 border-0 bg_primary white w-100 mt-4"
              >
                {loading ? <Loader /> : "Send Email"}
              </button>

              <p className="text-center mt-4">
                Have account already?
                <Link
                  href="/auth/signin"
                  className="text-decoration-none primary ms-2"
                >
                  signin
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

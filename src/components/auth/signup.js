import styles from "@/components/auth/Auth.module.css";
import Link from "next/link";
import { db } from "@/firebase/fire_config";
import { useState } from "react";
import { useAuth } from "@/firebase/fire_auth_context";
import { toast } from "react-toastify";
import Loader from "@/components/loader/loader";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { Back, Information } from "iconsax-react";
import Cookies from "js-cookie";

export default function Signup() {
  const [formIndex, setFormIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authUser, signUp } = useAuth();
  const router = useRouter();

  const onSignup = async (e) => {
    e.preventDefault();
    if (formIndex < 2) setFormIndex(formIndex + 1);
    if (formIndex == 2) {
      await signUp(email, password)
        .then(() => {
          const collRef = collection(db, "users");
          const userDoc = {
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
            phoneNumber: phoneNumber,
            gender: gender.toLowerCase(),
            email: email.toLowerCase(),
            isAdmin: false,
            isActive: true,
            joinedOn: serverTimestamp(),
            query: `${firstName} ${lastName}`.toLowerCase(),
            addressBook: {
              firstName: firstName.toLowerCase(),
              lastName: lastName.toLowerCase(),
              phoneNumber: phoneNumber,
              additionalPhoneNumber: "",
              address: "",
              additionalInformation: "",
            },
          };

          setDoc(doc(collRef, email.toLowerCase()), userDoc)
            .then(() => {
              router.push("/auth/signin");
              toast.success("User signed up");
            })
            .catch((e) => {
              toast.error(`Error while signing User up: ${e.message}`);
            })
            .finally(() => setLoading(false));
        })
        .catch((e) => {
          if (error.code === "auth/weak-password") toast.error("Weak password");
          else if (error.code === "auth/email-already-in-use") {
            toast.error("User already exists");
          } else toast.error(`Error while signing User up: ${e.message}`);
        })
        .finally(() => setLoading(false));
    }
  };

  const onBack = () => {
    if (formIndex > 0) setFormIndex(formIndex - 1);
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
              <h5 className="third">Sign Up</h5>
            </div>

            <form className="col-md-4 text-start mt-4 p-0" onSubmit={onSignup}>
              {formIndex == 0 && (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      required
                      className="form-control rounded-0 py-2"
                      id="firstName"
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <input
                    type="text"
                    required
                    className="form-control rounded-0 py-2"
                    id="lastName"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}

              {formIndex == 1 && (
                <>
                  <div className="mb-3">
                    <input
                      type="text"
                      required
                      className="form-control rounded-0 py-2"
                      id="phoneNumber"
                      placeholder="Phone Number"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <select
                    className="form-select rounded-0 py-2"
                    required
                    id="gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </>
              )}

              {formIndex == 2 && (
                <>
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
                </>
              )}

              <div className="w-100 mt-4 d-flex justify-content-around">
                {formIndex > 0 && (
                  <button
                    type="button"
                    className="btn btn-lg rounded-0 border-0 trans w-100"
                    onClick={onBack}
                  >
                    <Back />
                  </button>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-lg rounded-0 border-0 bg_primary white w-100"
                >
                  {formIndex != 2 && !loading && "Next"}
                  {formIndex == 2 && loading && <Loader />}
                  {formIndex == 2 && !loading && "Signup"}
                </button>
              </div>

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

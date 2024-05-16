import Link from "next/link";
import { useState } from "react";
import styles from "@/components/navigation/footer/Footer.module.css";
import { Call, Camera, DirectSend, Instagram, Location } from "iconsax-react";
import Loader from "@/components/loader/loader";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/fire_config";
import { toast } from "react-toastify";

export default function Footer() {
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");

  const onSendMessage = async (e) => {
    e.preventDefault();
    setSending(true);

    const collRef = collection(db, "contactUs");
    const contactDoc = {
      fullName: fullName,
      email: email,
      message: message,
    };

    setDoc(doc(collRef, email), contactDoc)
      .then(() => toast.success("Message sent."))
      .catch((e) => toast.error(`Error while sending message: ${e.message}`))
      .finally(() => setSending(false));
  };

  return (
    <footer className="">
      <section className="bg_blue_50 py-3">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-7 text-center">
              <h4>You can leave us a message here.</h4>

              <p className="m-0">we will get back to you as soon as posible</p>
            </div>

            <div className="col-md-5">
              <form className="row mt-3" onSubmit={onSendMessage}>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className={`form-control ${styles.form_field}`}
                    required
                    placeholder="Full Name"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="col-sm-6">
                  <input
                    type="email"
                    className={`form-control ${styles.form_field}`}
                    required
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-12 mt-3">
                  <textarea
                    type="text"
                    className={`form-control ${styles.form_field}`}
                    required
                    placeholder="Message"
                    style={{ height: "80px" }}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <div className="col-12 mt-3">
                  <button
                    type="submit"
                    disabled={sending}
                    className={`btn ${styles.btn_nav}`}
                  >
                    {sending ? <Loader /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg_black text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h5>CONTACT</h5>

              <hr />

              <div className="d-flex my-2">
                <Call className="me-1 text-white" variant="Bulk" />
                <div className="d-flex flex-column text-white me-1">
                  call us
                  <Link
                    className="text-decoration-none text-white"
                    href="tel:+2347063869144"
                    target="_blank"
                  >
                    +234-706-386-9144
                  </Link>
                </div>
              </div>

              <div className="d-flex my-2">
                <DirectSend className="me-1 text-white" variant="Bulk" />
                <div className="d-flex flex-column text-white me-1">
                  email us
                  <Link
                    className="text-decoration-none text-white"
                    href="mailto:ephronroyalfits@gmail.com"
                    target="_blank"
                  >
                    ephronroyalfits@gmail.com
                  </Link>
                </div>
              </div>

              <div className="d-flex my-2">
                <Location className="me-1 text-white" variant="Bulk" />
                <div className="d-flex flex-column text-white me-1">
                  visit us
                  <span className="text-white">
                    Nill Ifesowapo crescent, Ado, Ekiti State
                  </span>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <h5>EXPLORE</h5>

              <hr />

              <ul className="list-unstyled">
                <li className="mb-3">
                  <Link
                    className="text-decoration-none text-white"
                    href="https://www.instagram.com/ephron_royal_fits/"
                    target="_blank"
                  >
                    Shop Our Instagram
                  </Link>
                </li>

                <li className="mb-3">
                  <Link
                    className="text-decoration-none text-white"
                    href="/category/hoodies"
                  >
                    Hoodies
                  </Link>
                </li>

                <li className="mb-3">
                  <Link
                    className="text-decoration-none text-white"
                    href="/category/tees"
                  >
                    Tees
                  </Link>
                </li>

                <li className="mb-3">
                  <Link
                    className="text-decoration-none text-white"
                    href="/category/polos"
                  >
                    Polos
                  </Link>
                </li>

                <li className="mb-3">
                  <Link
                    className="text-decoration-none text-white"
                    href="/category/sweatshirts"
                  >
                    Sweatshirts
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <h5>COMPANY</h5>

              <hr />

              <ul className="list-unstyled">
                <li className="mb-3">
                  <Link
                    className="text-decoration-none text-white"
                    href="https://wa.me/+2347063869144?text=I am contacting you from ERF to enquire about..."
                    target="_blank"
                  >
                    Contact Us
                  </Link>
                </li>

                <li className="mb-3">
                  <Link
                    className="text-decoration-none text-white"
                    href="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li className="mb-3">
                  <Link
                    className="text-decoration-none text-white"
                    href="/terms"
                  >
                    Terms And Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-3">
              <h5>EPHRON ROYAL &apos;FITS</h5>

              <p className="mb-0 mt-4">
                Elevate your style with Ephron Royal &apos;fits, where art meets
                fashion in a harmonious blend of creativity and elegance.
                Explore our online store for a curated collection of unique
                art-inspired fashion pieces that allow you to express your
                individuality.
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col text-center">
              <Link className="text-white text-decoration-none" href="/">
                All rights reserved © www.ephronroyalfits.com
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

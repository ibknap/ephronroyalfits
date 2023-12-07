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
    <footer className="bg_secondary py-5">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h5>Contact Us</h5>

            <hr />

            <div className="d-flex my-3">
              <Call className="me-1" variant="Bulk" />
              <div className="d-flex flex-column me-1">
                call us
                <Link
                  className="text-decoration-none primary"
                  href="tel:+2347063869144"
                  target="_blank"
                >
                  +234-706-386-9144
                </Link>
              </div>
            </div>

            <div className="d-flex my-3">
              <DirectSend className="me-1" variant="Bulk" />
              <div className="d-flex flex-column me-1">
                email us
                <Link
                  className="text-decoration-none primary"
                  href="mailto:ephronroyalfits@gmail.com"
                  target="_blank"
                >
                  ephronroyalfits@gmail.com
                </Link>
              </div>
            </div>

            <div className="d-flex my-3">
              <Location className="me-1" variant="Bulk" />
              <div className="d-flex flex-column me-1">
                visit us
                <span className="primary">
                  Nill Ifesowapo crescent, Ado, Ekiti State
                </span>
              </div>
            </div>

            <div className="d-flex my-3">
              <Instagram className="me-1" variant="Bulk" />
              <Link
                className="text-decoration-none primary"
                href="https://www.instagram.com/ephron_royal_fits/"
                target="_blank"
              >
                christ_our_pride
              </Link>
            </div>
          </div>

          <div className="col-sm-6">
            <h5>Drop a message</h5>

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
                  style={{ height: "150px" }}
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

        <div className="row mt-5">
          <div className="col text-center">
            <Link className="grey_dark text-decoration-none" href="/">
              All rights reserved © www.ephronroyalfits.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { useState } from "react";
import styles from "@/components/navigation/footer/Footer.module.css";
import { Call, Camera, DirectSend, Instagram, Location } from "iconsax-react";
import Loader from "@/components/loader/loader";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/fire_config";
import { toast } from "react-toastify";
import { Julius_Sans_One } from "next/font/google";

const font = Julius_Sans_One({ subsets: ["latin"], weight: "400" });

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
    <footer className={font.className} style={{ fontSize: 14 }}>
      <section className="pt-3 mb-5">
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
                    className="form-control rounded-0"
                    required
                    placeholder="Full Name"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="col-sm-6">
                  <input
                    type="email"
                    className="form-control rounded-0"
                    required
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-12 mt-3">
                  <textarea
                    type="text"
                    className="form-control rounded-0"
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

      <section>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center">
              <div className="py-4">
                <Link
                  href="https://www.facebook.com/profile.php?id=61565968947843&mibextid=LQQJ4d"
                  target="_blank"
                  className="me-5"
                >
                  <img src="/images/facebook.png" alt="facebook" height={30} />
                </Link>

                <Link
                  href="https://www.instagram.com/ephron_royal_fits"
                  target="_blank"
                  className="me-5"
                >
                  <img
                    src="/images/instagram.png"
                    alt="instagram"
                    height={30}
                  />
                </Link>

                <Link href="https://x.com/e_royalfits" target="_blank">
                  <img src="/images/twitter.png" alt="twitter" height={30} />
                </Link>
              </div>
            </div>

            <div className="col-md-6 text-center">
              <div className="py-4">
                <img
                  src="/images/paystack.png"
                  alt="paystack"
                  className="me-4"
                  width={180}
                />
                <img src="/images/apple_pay.svg" alt="apple pay" height={40} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg_blue_50">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-4 text-center">
              <div className="py-4 d-flex justify-content-center align-items-center">
                <img src="/images/fashion.png" alt="fashion" height={40} />

                <h5 className="ms-3 fw-bold m-0">TOP FASHION</h5>
              </div>
            </div>

            <div className="col-md-4 text-center">
              <div className="py-4 d-flex justify-content-center align-items-center">
                <img src="/images/delivery.png" alt="delivery" height={40} />

                <h5 className="ms-3 fw-bold m-0">SMOOTH DELIVERY</h5>
              </div>
            </div>

            <div className="col-md-4 text-center">
              <div className="py-4 d-flex justify-content-center align-items-center">
                <img src="/images/support.png" alt="support" height={40} />

                <h5 className="ms-3 fw-bold m-0">EXELLENT SUPPORT</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="black mt-5 py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <img
                src="/logo/png/logo_long.png"
                alt="logo"
                className="rounded"
                width={218}
              />
            </div>

            <div className="col-md-4">
              <h5>CONTACT</h5>

              <div className="mt-5 d-flex my-2">
                <Call className="me-1 black" variant="Bulk" />
                <div className="d-flex flex-column black me-1">
                  call us
                  <Link
                    className="text-decoration-none black"
                    href="https://wa.me/+2347063869144?text=I am contacting you from ERF to enquire about..."
                    target="_blank"
                  >
                    +234-706-386-9144
                  </Link>
                </div>
              </div>

              <div className="d-flex my-2">
                <DirectSend className="me-1 black" variant="Bulk" />
                <div className="d-flex flex-column black me-1">
                  email us
                  <Link
                    className="text-decoration-none black"
                    href="mailto:ephronroyalfits@gmail.com"
                    target="_blank"
                  >
                    ephronroyalfits@gmail.com
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <h5>COMPANY</h5>

              <ul className="mt-5 list-unstyled">
                <li className="mb-3">
                  <Link
                    className="text-decoration-none black"
                    href="https://wa.me/+2347063869144?text=I am contacting you from ERF to enquire about..."
                    target="_blank"
                  >
                    Contact Us
                  </Link>
                </li>

                <li className="mb-3">
                  <Link className="text-decoration-none black" href="/privacy">
                    Privacy Policy
                  </Link>
                </li>

                <li className="mb-3">
                  <Link className="text-decoration-none black" href="/terms">
                    Terms And Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col text-center">
              <Link className="text-muted text-decoration-none" href="/">
                All rights reserved © www.ephronroyalfits.com
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

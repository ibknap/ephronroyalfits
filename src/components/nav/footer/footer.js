import Link from "next/link";
import { useState } from 'react';
import styles from '@/components/nav/footer/Footer.module.css'
import { Call, Camera, DirectSend, Location } from "iconsax-react";
import Loader from '@/components/loader/loader';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from "@/firebase/fire_config";
import { toast } from "react-toastify";

export default function Footer() {
    const [sending, setSending] = useState(false);
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [message, setMessage] = useState("");

    const onSendMessage = async event => {
        event.preventDefault();
        setSending(true);

        const collRef = collection(db, "contactUs");
        const contactDoc = {
            fullName: fullName,
            email: email,
            message: message,
        };

        setDoc(doc(collRef, email), contactDoc)
            .then(() => {
                setSending(false);
                toast.success("Message sent.");
            })
            .catch((error) => {
                setSending(false);
                toast.error(`Error while sending message: ${error}`);
            });
    }

    return (
        <footer className="bg_secondary py-5">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 white">
                        <h4>Contact Us</h4>
                        <hr />
                        <div className="d-flex my-3">
                            <Call className="mx-1" size="32" variant="Bold" />
                            <div className="d-flex flex-column mx-1">
                                call us
                                <Link className="text-decoration-none primary"
                                    href="tel:+2347033180897"
                                    as="tel:+2347033180897"
                                    target="_blank"
                                >
                                    +234-703-318-0897
                                </Link>
                            </div>
                        </div>
                        <div className="d-flex my-3">
                            <DirectSend className="mx-1" size="32" variant="Bold" />
                            <div className="d-flex flex-column mx-1">
                                email us
                                <Link className="text-decoration-none primary"
                                    href="mailto:northeastfoodbankorg@gmail.com"
                                    as="mailto:northeastfoodbankorg@gmail.com"
                                    target="_blank"
                                >
                                    northeastfoodbankorg@gmail.com
                                </Link>
                            </div>
                        </div>
                        <div className="d-flex my-3">
                            <Location className="mx-1" size="32" variant="Bold" />
                            <div className="d-flex flex-column mx-1">
                                visit us
                                <span className="primary">
                                    Barracks road Jimeta Yola
                                </span>
                            </div>
                        </div>
                        <div className="d-flex my-3">
                            <Camera className="mx-1" size="32" variant="Bold" />
                            <div className="d-flex flex-column mx-1">
                                follow us
                                <Link className="text-decoration-none primary"
                                    href="https://www.linkedin.com/company/smartrrproject/"
                                    as="https://www.linkedin.com/company/smartrrproject/"
                                    target="_blank"
                                >
                                    linkedin
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 white">
                        <h4>Drop a message</h4>
                        <form className="mt-5" onSubmit={onSendMessage}>
                            <div className="d-flex mb-3">
                                <div className="col-sm-6">
                                    <div className="mx-1">
                                        <input
                                            type="text"
                                            className={`form-control ${styles.form_field}`}
                                            required
                                            placeholder="Full Name"
                                            onChange={(event) => setFullName(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="mx-1">
                                        <input
                                            type="email"
                                            className={`form-control ${styles.form_field}`}
                                            required
                                            placeholder="Email Address"
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 my-3">
                                <div className="mx-1">
                                    <textarea
                                        type="text"
                                        className={`form-control ${styles.form_field}`}
                                        required
                                        placeholder="Message"
                                        style={{ height: "150px" }}
                                        onChange={(event) => setMessage(event.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-4 col-sm-6 d-flex justify-content-between" style={{ border: "none" }}>
                                {
                                    sending
                                        ? <Loader />
                                        : <button type="submit" className={`btn btn-lg btn-success ${styles.btn_nav} shadow px-3 py-2`}>
                                            Submit
                                        </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col text-center">
                        <Link className="grey_dark text-decoration-none" href="/" as="/">
                            All rights reserved © www.northeastfoodbank.org
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

import styles from '@/components/auth/Auth.module.css'
import Link from 'next/link';
import { db } from "@/firebase/fire_config";
import { useState } from 'react';
import { useAuth } from '@/firebase/fire_auth_context';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { Back, Information } from 'iconsax-react';
import Cookies from 'js-cookie';

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

    const onSignup = async event => {
        event.preventDefault();
        if (formIndex < 2) setFormIndex(formIndex + 1);
        if (formIndex == 2) {
            setLoading(true);

            await signUp(email, password)
                .then(() => {
                    const collRef = collection(db, "users");
                    const userDoc = {
                        firstName: firstName,
                        firstName_query: firstName.toLowerCase(),
                        lastName: lastName,
                        lastName_query: lastName.toLowerCase(),
                        phoneNumber: phoneNumber,
                        gender: gender,
                        email: email.toLowerCase(),
                        isAdmin: false,
                        isActive: true,
                        joinedOn: serverTimestamp(),
                        addressBook: {
                            firstName: firstName,
                            lastName: lastName,
                            phoneNumber: phoneNumber,
                            additionalPhoneNumber: "",
                            address: "",
                            additionalInformation: "",
                        }
                    };

                    setDoc(doc(collRef, email), userDoc)
                        .then(() => {
                            setLoading(false);
                            router.push('/auth/signin');
                            toast.success("User signed up");
                        })
                        .catch((error) => {
                            setLoading(false);
                            toast.error(`Error while signing User up: ${error.message}`);
                        });

                }).catch(error => {
                    setLoading(false);
                    if (error.code === "auth/weak-password") {
                        toast.error("Weak password");
                    } else if (error.code === "auth/email-already-in-use") {
                        toast.error("User already exists");
                    }
                    else {
                        toast.error(`Error while signing User up: ${error.message}`);
                    }
                });
        }
    }

    const onBack = () => {
        if (formIndex > 0) setFormIndex(formIndex - 1);
    }

    if (authUser && Cookies.get("NEFBSignedIn")) {
        return (
            <div className="container">
                <div className="row my-5 justify-content-center">
                    <div className="col-12 text-muted text-center">
                        <Information variant="Bold" size={200} />
                        <p>You logged in already.</p>
                    </div>
                    <Link href="/" className={`btn btn-lg btn-success ${styles.auth_btn} w-50 my-5`}>
                        Go Back Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.container}>
                <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                    <header className="mb-auto">
                        <h4 className="float-md-start mb-0">
                            <Link className="text-decoration-none primary" href="/" as="/">
                                NEFB
                            </Link>
                        </h4>
                    </header>

                    <div className="px-3 row justify-content-center">
                        <h2>Sign Up</h2>
                        <p>Create an account to get started</p>
                        <p className="text-muted">Input your details below to complete.</p>

                        <form className="col-md-4 mt-4" onSubmit={onSignup}>
                            {formIndex == 0 && (
                                <>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            id="firstName"
                                            placeholder="Jon"
                                            onChange={(event) => setFirstName(event.target.value)}
                                        />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            id="lastName"
                                            placeholder="Doe"
                                            onChange={(event) => setLastName(event.target.value)}
                                        />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                </>
                            )}

                            {formIndex == 1 && (
                                <>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            id="phoneNumber"
                                            placeholder="Jon"
                                            onChange={(event) => setPhoneNumber(event.target.value)}
                                        />
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                    </div>
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
                                            required
                                            id="gender"
                                            onChange={(event) => setGender(event.target.value)}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <label htmlFor="gender">Gender</label>
                                    </div>
                                </>
                            )}

                            {formIndex == 2 && (
                                <>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            required
                                            className="form-control"
                                            id="emailAddr"
                                            placeholder="name@example.com"
                                            onChange={(event) => setEmail(event.target.value)}
                                        />
                                        <label htmlFor="emailAddr">Email address</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="password"
                                            required
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            onChange={(event) => setPassword(event.target.value)}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </>
                            )}

                            <div className="w-100 mt-4 d-flex justify-content-around">
                                {formIndex > 0 &&
                                    <button type="button"
                                        className="w-100 btn btn-lg border_none trans secondary"
                                        onClick={onBack}
                                    >
                                        <Back />
                                    </button>
                                }

                                <button type="submit" className={`w-100 btn btn-lg btn-success ${styles.auth_btn}`}>
                                    {formIndex != 2 && !loading && "Next"}
                                    {formIndex == 2 && loading && <Loader />}
                                    {formIndex == 2 && !loading && "Signup"}
                                </button>
                            </div>

                            <p className="mt-4">
                                Have account already?
                                <Link href="/auth/signin" as="/auth/signin" className="text-decoration-none primary"> signin</Link>.
                            </p>
                        </form>
                    </div>

                    <footer className="mt-auto text-muted">
                        For further support, you may visit the <Link href="/help_center" as="/help_center" className="text-decoration-none primary">Help Center.</Link>
                    </footer>
                </div>
            </div>
        </>
    )
}

import Image from 'next/image'
import Link from 'next/link'
import styles from '@/components/auth/Auth.module.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/firebase/context/AuthUserContext';
import Cookies from 'js-cookie';
import { FireApp } from "@/firebase/firebase";
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { countryOption } from '@/components/utils';

const db = getFirestore(FireApp);

export default function Auth({ isLogin, isSignup, isForgotPass }) {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("AFGHANISTAN");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [accountType, setAccountType] = useState("STARTER");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [referral, setReferral] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpError, setSignUpError] = useState(null);
    const router = useRouter();
    const { signIn, signUp } = useAuth();


    const onLogin = async event => {
        event.preventDefault();
        setLoading(true);

        await signIn(email, password)
            .then((data) => {
                setLoading(false);

                const profileRef = doc(db, 'users', data.user.email);
                getDoc(profileRef)
                    .then((docSnapshot) => {
                        if (docSnapshot.exists()) {
                            const user = docSnapshot.data();
                            if (user.disable) {
                                router.push('/dashboard/auth/login');
                            } else {
                                Cookies.set("SignedIn", true, { expires: 7 });
                                if (data.user.email == "tradeby.org1@gmail.com") {
                                    router.push('/dashboard/admin');
                                } else {
                                    if (user.frontID && user.backID) {
                                        router.push('/dashboard/user');
                                    } else {
                                        router.push('/dashboard/user/upload_id');
                                    }
                                }
                            }
                        } else {
                            console.log('Profile not found');
                        }
                    })
                    .catch((error) => {
                        console.log('Error getting profile:', error);
                    });
            })
            .catch(error => {
                setLoading(false);
                if (error.code === "auth/user-not-found") {
                    setError("User Not Found")
                } else if (error.code === "auth/wrong-password") {
                    setError("Wrong Password")
                }
                else {
                    setError(error.code)
                }
            });
    };

    const onSignUp = async event => {
        event.preventDefault();
        setLoading(true);

        await signUp(signUpEmail, signUpPassword)
            .then(() => {
                const collRef = collection(db, "users");
                const userDoc = {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    zipCode: zipCode,
                    country: country,
                    phoneNumber: phoneNumber,
                    email: signUpEmail,
                    referral: referral,
                    disable: false,
                    accountStatus: "INACTIVE",
                    dashboard: {
                        balance: "0",
                        status: true,
                        accountType: accountType,
                        withdraw: {
                            balance: "0",
                            receiverWallet: "",
                        },
                        deposit: {
                            balance: "0",
                            profit: "0",
                            sendersWallet: "",
                            hasdDI: ""
                        }
                    }
                };

                setDoc(doc(collRef, signUpEmail), userDoc)
                    .then(() => {
                        setLoading(false);
                        router.push('/auth/login');
                    })
                    .catch(error => setSignUpError(error.code));

            }).catch(error => {
                setLoading(false);
                if (error.code === "auth/weak-password") {
                    setSignUpError("Weak Password")
                } else if (error.code === "auth/email-already-in-use") {
                    setSignUpError("User Already Exists")
                }
                else {
                    setSignUpError(error.code)
                }
            });
    };

    if (isLogin) {
        return (
            <div className={styles.container}>
                <div className="row h-100">
                    <div className={`${styles.bg} col-sm-7 bg_primary p-5`}>
                        <div className="row flex-column justify-content-between h-100">
                            <div className="col-6" style={{ zIndex: 999 }}>
                                <Image
                                    src="/logo.png"
                                    alt="logo"
                                    className="rounded"
                                    width={100}
                                    height={100}
                                    priority
                                />
                            </div>

                            <div className="col-6 white w-100" style={{ zIndex: 999 }}>
                                <h1>Login</h1>
                                <p>Enter your details to access Dashboard!</p>
                            </div>
                        </div>
                    </div>

                    <div className={`col-sm-5 p-5 position-relative ${styles.formContainer}`}>
                        {loading ? <div className={styles.process} /> : ""}

                        <form className={styles.form} onSubmit={onLogin}>
                            <div className="mb-3">Enter Your Login Credentials Below!</div>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control" id="emailAddr"
                                    required
                                    placeholder="Email Address"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <label htmlFor="emailAddr">Email Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className="form-control" id="password"
                                    required
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                            <div className="mt-5 col-sm-6 d-flex justify-content-between mb-2" style={{ border: "none" }}>
                                <button type="submit" className="btn btn-md btn_primary">Login</button>
                                or
                                <Link href="/auth/signup" className="pink text-decoration-none">Signup</Link>
                            </div>
                            Forgot password? Reset <Link href="/auth/forgot_password" className="pink text-decoration-none">here</Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    if (isSignup) {
        return (
            <div className={styles.container}>
                <div className="row h-100">
                    <div className={`${styles.bg2} d-none d-md-block col-sm-7 bg_primary p-5`}>
                        <div className="row flex-column justify-content-between h-100">
                            <div className="col-6" style={{ zIndex: 999 }}>
                                <Image
                                    src="/logo.png"
                                    alt="logo"
                                    className="rounded"
                                    width={100}
                                    height={100}
                                    priority
                                />
                            </div>

                            <div className="col-6 white w-100" style={{ zIndex: 999 }}>
                                <h1>Sign Up</h1>
                                <p>Enter your details to access Dashboard!</p>
                            </div>
                        </div>
                    </div>

                    <div className={`col-sm-5 p-5 position-relative ${styles.formContainer}`}>
                        {loading ? <div className={styles.process} /> : ""}

                        <div className="col-6 d-block d-md-none primary w-100" style={{ zIndex: 999 }}>
                            <h1>Sign Up</h1>
                            <p>Enter your details to access Dashboard!</p>
                        </div>

                        <form className={styles.form} onSubmit={onSignUp}>
                            <div className="mb-3 d-none d-md-block">Enter Your Credentials Below!</div>
                            {signUpError && <div className="alert alert-danger">{signUpError}</div>}

                            <div className="d-flex mb-3">
                                <div className="col-sm-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            required
                                            placeholder="First Name"
                                            onChange={(event) => setFirstName(event.target.value)}
                                        />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            required
                                            placeholder="Last Name"
                                            onChange={(event) => setLastName(event.target.value)}
                                        />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex mb-3">
                                <div className="col-sm-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            required
                                            placeholder="Username"
                                            onChange={(event) => setUsername(event.target.value)}
                                        />
                                        <label htmlFor="username">Username</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mx-1">
                                        <select
                                            className="form-select"
                                            id="accountType"
                                            required
                                            onChange={(event) => setAccountType(event.target.value)}
                                        >
                                            <option selected>STARTER</option>
                                            <option value="BASIC">BASIC</option>
                                            <option value="STANDARD">STANDARD</option>
                                            <option value="CORE">CORE</option>
                                            <option value="ADVANCED">ADVANCED</option>
                                            <option value="PREMIUM">PREMIUM</option>
                                        </select>
                                        <label htmlFor="accountType">Account Type</label>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex mb-3">
                                <div className="col-sm-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="zipCode"
                                            required
                                            placeholder="Zip Code"
                                            onChange={(event) => setZipCode(event.target.value)}
                                        />
                                        <label htmlFor="zipCode">Zip Code</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mx-1">
                                        <select
                                            className="form-select"
                                            id="country"
                                            required
                                            onChange={(event) => setCountry(event.target.value)}
                                        >
                                            <option selected>AFGHANISTAN</option>
                                            {countryOption.map((countryOption) => (countryOption))}
                                        </select>
                                        <label htmlFor="country">Country</label>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex mb-3">
                                <div className="col-sm-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phoneNumber"
                                            required
                                            placeholder="Phone Number"
                                            onChange={(event) => setPhoneNumber(event.target.value)}
                                        />
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="emailAddr"
                                            required
                                            placeholder="Email Address"
                                            onChange={(event) => setSignUpEmail(event.target.value)}
                                        />
                                        <label htmlFor="emailAddr">Email Address</label>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="col-sm-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            required
                                            placeholder="Password"
                                            onChange={(event) => setSignUpPassword(event.target.value)}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mx-1">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            required
                                            placeholder="Confirm Password"
                                        />
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 my-3">
                                <div className="form-floating mx-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="referral"
                                        placeholder="Referral (optional)"
                                        onChange={(event) => setReferral(event.target.value)}
                                    />
                                    <label htmlFor="referral">Referral (optional)</label>
                                </div>
                            </div>

                            <div className="col-12 my-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="privacyCheck" checked />
                                    <label className="form-check-label" for="privacyCheck">
                                        I accept the Website <Link href="/terms" className="pink text-decoration-none">Terms of Use</Link>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-4 col-sm-6 d-flex justify-content-between" style={{ border: "none" }}>
                                <button type="submit" className="btn btn-md btn_primary">Signup</button>
                                or
                                <Link href="/auth/login" className="pink text-decoration-none">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className="row h-100">
                <div className={`${styles.bg3} col-sm-7 bg_primary p-5`}>
                    <div className="row flex-column justify-content-between h-100">
                        <div className="col-6" style={{ zIndex: 999 }}>
                            <Image
                                src="/logo.png"
                                alt="logo"
                                className="rounded"
                                width={100}
                                height={100}
                                priority
                            />
                        </div>

                        <div className="col-6 white w-100" style={{ zIndex: 999 }}>
                            <h1>Forgot Password</h1>
                        </div>
                    </div>
                </div>

                <div className={`col-sm-5 p-5 position-relative ${styles.formContainer}`}>
                    {loading ? <div className={styles.process} /> : ""}

                    <form className={styles.form}>
                        <div className="mb-3">Enter Email Address Below!</div>

                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="emailAddr" required placeholder="Email Address" />
                            <label htmlFor="emailAddr">Email Address</label>
                        </div>

                        <div className="mt-5 col-sm-6 d-flex justify-content-between" style={{ border: "none" }}>
                            <button type="button" className="btn btn-md btn_primary">Reset Password</button>
                            or
                            <Link href="/auth/login" className="pink text-decoration-none">Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

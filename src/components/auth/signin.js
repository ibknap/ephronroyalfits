import styles from '@/components/auth/Auth.module.css'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { db } from "@/firebase/fire_config";
import { useState } from 'react';
import { useAuth } from '@/firebase/fire_auth_context';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { Information } from 'iconsax-react';

export default function Signin() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { authUser, signIn } = useAuth();
    const router = useRouter();

    const onSignin = async event => {
        event.preventDefault();
        setLoading(true);

        await signIn(email, password)
            .then((data) => {
                setLoading(false);

                const profileRef = doc(db, "users", data.user.email);
                getDoc(profileRef)
                    .then((docSnapshot) => {
                        if (docSnapshot.exists()) {
                            Cookies.set("SignedIn", true, { expires: 7 });
                            router.push("/");
                            toast.success("User signed in");
                        } else {
                            toast.error("User not found");
                        }
                    })
                    .catch((error) => {
                        toast.error(`Error while getting User data: ${error}`);
                    });
            })
            .catch(error => {
                setLoading(false);
                if (error.code === "auth/user-not-found") {
                    toast.error("User not found");
                } else if (error.code === "auth/wrong-password") {
                    toast.error("Wrong password");
                }
                else {
                    toast.error(`Something is wrong: ${error.code}`);
                }
            });
    };

    if (authUser) {
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
                        <h2>Sign In</h2>
                        <p>What&apos;s your email address</p>
                        <p className="text-muted">Type your email address to login to your account</p>

                        <form className="col-md-4 mt-4" onSubmit={onSignin}>
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

                            <button type="submit" className={`btn btn-lg btn-success ${styles.auth_btn} col-md-8 mt-4`}>
                                {loading ? <Loader /> : "Signin"}
                            </button>

                            <p className="mt-4">
                                Want to do something different? Reset your password
                                <Link href="/auth/reset_password" as="/auth/reset_password" className="text-decoration-none primary"> here</Link> or
                                <Link href="/auth/signup" as="/auth/signup" className="text-decoration-none primary"> signup</Link> a new account.
                            </p>
                        </form>
                    </div>

                    <footer className="mt-auto text-muted">
                        For further support, you may visit the <Link href="/help_center" className="text-decoration-none primary">Help Center.</Link>
                    </footer>
                </div>
            </div>
        </>
    )
}

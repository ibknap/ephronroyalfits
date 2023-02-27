import styles from '@/components/auth/Auth.module.css'
import { useState } from 'react';
import Link from 'next/link';

export default function Signup() {
    const [formIndex, setFormIndex] = useState(0);

    const signupUser = async event => {
        event.preventDefault();

        if (formIndex < 2) setFormIndex(formIndex + 1);
    }

    return (
        <>
            <div className={styles.container}>
                <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                    <header className="mb-auto">
                        <h4 className="float-md-start mb-0">
                            <Link className="text-decoration-none primary" href="/">
                                NEFB
                            </Link>
                        </h4>
                    </header>

                    <div className="px-3 row justify-content-center">
                        <h2>Sign Up</h2>
                        <p>Create an account to get started</p>
                        <p className="text-muted">Input your details below to complete.</p>

                        <form className="col-md-4 mt-4" onSubmit={signupUser}>
                            {formIndex == 0 && (
                                <>
                                    <div className="form-floating mb-3">
                                        <input type="text" required className="form-control" id="firstName" placeholder="Jon" />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="text" required className="form-control" id="lastName" placeholder="Doe" />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                </>
                            )}

                            {formIndex == 1 && (
                                <>
                                    <div className="form-floating mb-3">
                                        <input type="text" required className="form-control" id="phoneNumber" placeholder="Jon" />
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                    </div>
                                    <div className="form-floating">
                                        <select className="form-select" required id="gender">
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
                                        <input type="email" required className="form-control" id="emailAddr" placeholder="name@example.com" />
                                        <label htmlFor="emailAddr">Email address</label>
                                    </div>
                                    <div className="form-floating">
                                        <input type="password" required className="form-control" id="password" placeholder="Password" />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                </>
                            )}

                            <button className={`btn btn-lg btn-success ${styles.auth_btn} col-md-8 mt-4`}>
                                {formIndex != 2 ? "Next" : "Signup"}
                            </button>

                            <p className="mt-4">
                                Have account already?
                                <Link href="/auth/signin" className="text-decoration-none primary"> signin</Link>.
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

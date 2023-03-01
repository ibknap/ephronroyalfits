import styles from '@/components/auth/Auth.module.css'
import Link from 'next/link';

export default function Signin() {
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

                        <form className="col-md-4 mt-4">
                            <div className="form-floating mb-3">
                                <input type="email" required className="form-control" id="emailAddr" placeholder="name@example.com" />
                                <label htmlFor="emailAddr">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" required className="form-control" id="password" placeholder="Password" />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className={`btn btn-lg btn-success ${styles.auth_btn} col-md-8 mt-4`}>Signin</button>
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

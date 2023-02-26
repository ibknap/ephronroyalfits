import styles from '@/components/auth/Auth.module.css'
import Link from 'next/link';

export default function Signup() {
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

                        <form className="col-md-4 mt-4">
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label for="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label for="floatingPassword">Password</label>
                            </div>
                            <button className={`btn btn-lg btn-success ${styles.auth_btn} col-md-8 mt-4`}>Signup</button>
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

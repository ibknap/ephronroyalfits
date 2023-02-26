import styles from '@/components/help_center/HelpCenter.module.css'
import { Document } from 'iconsax-react';
import Link from 'next/link';

export default function Signin() {
    return (
        <>
            <div className="d-flex h-100 text-center text-white bg-dark">
                <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                    <header className="mb-auto">
                        <div>
                            <h3 className="float-md-start mb-0">Cover</h3>
                            <nav className="nav nav-masthead justify-content-center float-md-end">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                                <a className="nav-link" href="#">Features</a>
                                <a className="nav-link" href="#">Contact</a>
                            </nav>
                        </div>
                    </header>

                    <main className="px-3">
                        <h2>Sign In</h2>
                        <p>What&apos;s your email address</p>
                        <p className="text-muted">Type your email address to login to your account</p>
                        <p className="lead">
                            <a href="#" className="btn btn-lg btn-secondary fw-bold border-white bg-white">Learn more</a>
                        </p>
                    </main>

                    <footer className="mt-auto text-white-50">
                        <p>
                            For further support, you may visit the <Link href="/help_center" className="text-decoration-none primary">Help Center.</Link>
                        </p>
                    </footer>
                </div>
            </div>
        </>
    )
}

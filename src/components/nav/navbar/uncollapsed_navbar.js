import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import styles from '@/components/nav/navbar/Navbar.module.css'
import { ArrowDown3, Bag2, Heart, People, SearchNormal, ShoppingCart, User, Warning2 } from 'iconsax-react'
import { useAuth } from '@/firebase/fire_auth_context';
import SearchBox from '@/components/search/search';

export default function UnCollapsedNavbar({ totalCart }) {
    const router = useRouter();
    const { loading, authUser, logOut } = useAuth();

    // toggle live chat 
    const liveChat = () => {
        if (typeof window !== 'undefined' && window.Tawk_API) {
            window.Tawk_API.toggle();
        }
    };

    return (
        <>
            <nav className={`${styles.navbar} navbar navbar-expand-md navbar-light fixed-top shadow-sm`}>
                <div className="container">
                    <Link className="navbar-brand" href="/" as="/">
                        <Image
                            src="/images/logo_trans_long.png"
                            alt="logo"
                            className="rounded"
                            width={128}
                            height={72}
                            priority
                        />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <SearchBox />

                        <ul className="d-flex navbar-nav ">
                            <li className="nav-item">
                                <div className="dropdown">
                                    <button className={styles.dropdown} type="button" id="accountMenu" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="d-flex ">
                                            <User className="mx-1" variant="Bold" />
                                            <span className={styles.show_nav_text}>Account</span>
                                            <ArrowDown3 size="16" className="mx-1" variant="Bold" />
                                        </span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="accountMenu">
                                        <li className="m-2">
                                            {!loading && authUser
                                                ? <button className={`dropdown-item btn btn-success ${styles.btn_nav} text-center white shadow-sm px-3 py-2`}
                                                    onClick={logOut}
                                                >
                                                    Log Out
                                                </button>
                                                : <Link className={`dropdown-item btn btn-success ${styles.btn_nav} text-center white shadow-sm px-3 py-2`}
                                                    href="/auth/signin"
                                                    as="/auth/signin"
                                                >
                                                    Sign In
                                                </Link>
                                            }
                                        </li>
                                        {!loading && authUser &&
                                            <>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li className="m-2">
                                                    <Link className={styles.dropdown_item} href="/account" as="/account">
                                                        <span className="d-flex ">
                                                            <User className="mx-1" variant="Bold" />
                                                            <span className={styles.show_nav_text}>My Account</span>
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li className="m-2">
                                                    <Link className={styles.dropdown_item} href="/account/donate" as="/account/donate">
                                                        <span className="d-flex ">
                                                            <Bag2 className="mx-1" variant="Bold" />
                                                            <span className={styles.show_nav_text}>My Donations</span>
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li className="m-2">
                                                    <Link className={styles.dropdown_item} href="/account/saved" as="/account/saved">
                                                        <span className="d-flex ">
                                                            <Heart className="mx-1" variant="Bold" />
                                                            <span className={styles.show_nav_text}>Saved Items</span>
                                                        </span>
                                                    </Link>
                                                </li>
                                            </>
                                        }
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="dropdown">
                                    <button className={styles.dropdown} type="button" id="helpMenu" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="d-flex ">
                                            <Warning2 className="mx-1" variant="Bold" />
                                            <span className={styles.show_nav_text}>Help</span>
                                            <ArrowDown3 size="16" className="mx-1" variant="Bold" />
                                        </span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="helpMenu">
                                        <li className="m-2">
                                            <Link className={styles.dropdown_item} href="/help_center" as="/help_center">
                                                <span className="d-flex ">
                                                    <People className="mx-1" variant="Bold" />
                                                    <span className={styles.show_nav_text}>Help Center</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li className="m-2">
                                            <a
                                                className={`dropdown-item btn btn-success ${styles.btn_nav} text-center white shadow-sm px-3 py-2`}
                                                href="#!" onClick={liveChat}
                                            >
                                                Live Chat
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${router.asPath == "/cart" ? "nav-link primary bg_grey rounded" : "secondary"} position-relative`}
                                    href="/cart"
                                    as="/cart"
                                >
                                    <ShoppingCart className="mx-1" variant="Bold" />
                                    <span className={styles.show_nav_text}>Cart</span>
                                    <span className="secondary mx-2 text-danger fw-bold">{totalCart}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

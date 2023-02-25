import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import styles from '@/components/nav/navbar/Navbar.module.css'
import { ArrowDown3, Bag2, Heart, People, SearchNormal, ShoppingCart, User, Warning2 } from 'iconsax-react'

export default function UnCollapsedNavbar() {
    const router = useRouter();

    return (
        <>
            <nav className={`${styles.navbar} navbar navbar-expand-md navbar-light fixed-top shadow-sm`}>
                <div className="container">
                    <Link className="navbar-brand" href="/">
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
                        <form className={`${styles.search_form} me-auto mb-2 mb-md-0`}>
                            <input className={`form-control me-2 ${styles.input_search}`} type="search" placeholder="Search" aria-label="Search" />
                            <button className={`btn btn-lg btn-success ${styles.btn_nav} shadow px-3 py-2`} type="button">
                                <span className="d-flex">
                                    <span className={styles.show_search_text}>SEARCH</span>
                                    <SearchNormal size="24" className="mx-2" />
                                </span>
                            </button>
                        </form>

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
                                            <Link className={`dropdown-item btn btn-success ${styles.btn_nav} text-center white shadow-sm px-3 py-2`} href="#">
                                                Sign In
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li className="m-2">
                                            <Link className={styles.dropdown_item} href="#">
                                                <span className="d-flex ">
                                                    <User className="mx-1" variant="Bold" />
                                                    <span className={styles.show_nav_text}>My Account</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="m-2">
                                            <Link className={styles.dropdown_item} href="#">
                                                <span className="d-flex ">
                                                    <Bag2 className="mx-1" variant="Bold" />
                                                    <span className={styles.show_nav_text}>Orders</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="m-2">
                                            <Link className={styles.dropdown_item} href="#">
                                                <span className="d-flex ">
                                                    <Heart className="mx-1" variant="Bold" />
                                                    <span className={styles.show_nav_text}>Saved Items</span>
                                                </span>
                                            </Link>
                                        </li>
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
                                            <Link className={styles.dropdown_item} href="#">
                                                <span className="d-flex ">
                                                    <People className="mx-1" variant="Bold" />
                                                    <span className={styles.show_nav_text}>Help Center</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li className="m-2">
                                            <Link className={`dropdown-item btn btn-success ${styles.btn_nav} text-center white shadow-sm px-3 py-2`} href="#">
                                                Live Chat
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${router.asPath == "/cart" ? "nav-link primary bg_grey rounded" : "secondary"}`} href="#">
                                    <ShoppingCart className="mx-1" variant="Bold" />
                                    <span className={styles.show_nav_text}>Cart</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";
import { useState } from "react";
import styles from '@/components/nav/navbar/Navbar.module.css'
import { Bag2, CloseSquare, Heart, Home, Menu, People, SearchNormal, ShoppingCart, User } from 'iconsax-react'

export default function CollapsedNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // toggle slide navbar
    const toggleNavbar = () => setIsOpen(!isOpen);

    // toggle live chat 
    const liveChat = () => {
        if (typeof window !== 'undefined' && window.Tawk_API) {
            window.Tawk_API.toggle();
        }
    };

    return (
        <>
            <div className="container fixed-top bg-white shadow-sm">
                <div className="row justify-content-between">
                    <div className="col">
                        <div className="d-flex justify-content-between align-items-center">
                            <Link className="navbar-brand" href="/">
                                <Image
                                    src="/images/logo_trans_long.png"
                                    alt="logo"
                                    className="rounded"
                                    width={118}
                                    height={62}
                                    priority
                                />
                            </Link>
                            <div className="d-flex">
                                <Link className={`nav-link ${router.asPath == "/cart" ? "nav-link primary bg_grey rounded" : "secondary"}`} href="#">
                                    <ShoppingCart className="mx-1" variant="Bold" />
                                    <span className={styles.show_nav_text}>Cart</span>
                                </Link>
                                <Menu className={`mx-3 ${styles.toggler}`} variant="Bold" onClick={toggleNavbar} />
                            </div>
                        </div>
                    </div>
                </div>

                <form className={`${styles.search_form} me-auto mb-2 mb-md-0`}>
                    <input className={`form-control me-2 ${styles.input_search}`} type="search" placeholder="Search" aria-label="Search" />
                    <button className={`btn btn-lg btn-success ${styles.btn_nav} shadow px-3 py-2`} type="button">
                        <span className="d-flex">
                            <span className={styles.show_search_text}>SEARCH</span>
                            <SearchNormal size="24" className="mx-2" />
                        </span>
                    </button>
                </form>
            </div>

            {/* overlay */}
            {isOpen && <div className={`${styles.overlay} ${isOpen ? styles.show : ''}`} onClick={toggleNavbar} />}

            {/* collapsed navbar */}
            <nav className={`${styles.collapsed_navbar} ${isOpen ? styles.collapsed_open : ""}`}>
                <div className={styles.collapsed_container}>
                    <CloseSquare size="24" className={`m-2 ${styles.toggler}`} onClick={toggleNavbar} />

                    <ul className={styles.collapsed_menu}>
                        <li className={`m-2 ${styles.collapsed_menu_header}`}>
                            NEFB
                        </li>
                        <li className="m-2">
                            <Link className={styles.dropdown_item} href="/">
                                <span className="d-flex ">
                                    <Home className="mx-1" variant="Bold" />
                                    Home
                                </span>
                            </Link>
                        </li>
                        <li className={`m-2 ${styles.collapsed_menu_header}`}>
                            Account
                        </li>
                        <li className="m-2">
                            <Link className={styles.dropdown_item} href="#">
                                <span className="d-flex ">
                                    <User className="mx-1" variant="Bold" />
                                    My Account
                                </span>
                            </Link>
                        </li>
                        <li className="m-2">
                            <Link className={styles.dropdown_item} href="#">
                                <span className="d-flex ">
                                    <Bag2 className="mx-1" variant="Bold" />
                                    Orders
                                </span>
                            </Link>
                        </li>
                        <li className="m-2">
                            <Link className={styles.dropdown_item} href="#">
                                <span className="d-flex ">
                                    <Heart className="mx-1" variant="Bold" />
                                    Saved Items
                                </span>
                            </Link>
                        </li>
                        <li className="m-2">
                            <Link className={`dropdown-item btn btn-success ${styles.btn_nav} text-center white shadow-sm px-3 py-2`} href="#">
                                Sign In
                            </Link>
                        </li>
                        <li className={`m-2 ${styles.collapsed_menu_header}`}>
                            Help
                        </li>
                        <li className="m-2">
                            <Link className={styles.dropdown_item} href="/help_center">
                                <span className="d-flex ">
                                    <People className="mx-1" variant="Bold" />
                                    Help Center
                                </span>
                            </Link>
                        </li>
                        <li className="m-2">
                            <a
                                className={`dropdown-item btn btn-success ${styles.btn_nav} text-center white shadow-sm px-3 py-2`}
                                href="#!" onClick={liveChat}
                            >
                                Live Chat
                            </a>
                        </li>
                        <li className="m-2 text-center">
                            <Link className="grey_dark text-decoration-none" href="/">
                                All rights reserved © www.northeastfoodbank.org
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

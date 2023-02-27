import styles from '@/components/account/Account.module.css'
import { useMediaQuery } from "@chakra-ui/react";
import { Bag2, Edit, HambergerMenu, Heart, User } from 'iconsax-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Account() {
    const [allowMenu, setAllowMenu] = useState(false);
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    function showMenu() {
        setAllowMenu(!allowMenu);
    }

    return (
        <>
            <div className="container ">
                <div className="row justify-content-center">
                    {isMobile &&
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-sm my-2" onClick={showMenu}>
                                Menu <HambergerMenu />
                            </button>
                        </div>
                    }

                    {allowMenu || !isMobile ?
                        <div className="col-md-3">
                            <div className="m-2 p-2 shadow rounded">
                                <ul className="list-unstyled secondary">
                                    <li className="my-5">
                                        <Link className="secondary text-decoration-none" href="/account">
                                            <span className="d-flex ">
                                                <User className="mx-1" variant="Bold" />
                                                My Account
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="my-5">
                                        <Link className="secondary text-decoration-none" href="/account/order">
                                            <span className="d-flex ">
                                                <Bag2 className="mx-1" variant="Bold" />
                                                Orders
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="my-5">
                                        <Link className="secondary text-decoration-none" href="/account/saved">
                                            <span className="d-flex ">
                                                <Heart className="mx-1" variant="Bold" />
                                                Saved Items
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="mt-5">
                                        <Link className={`w-100 btn btn-success ${styles.btn_nav} text-center white shadow-sm py-3`} href="#">
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>:""
                    }

                    <div className="col-md-8">
                        <div className="m-2 shadow p-3 rounded">
                            <div className={styles.card_header}>
                                My Account
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-6">
                                    <div className="my-2 p-2 card">
                                        <div>ACCOUNT DETAILS</div>
                                        <hr />
                                        <span className="text-muted mb-2">Ibukunoluwa Naphtali</span>
                                        <span className="text-muted mb-2">ibukunoluwanap@gmail.com</span>
                                        <span className="text-muted mb-2">+2349018398960</span>
                                        <span className="text-muted mb-2">Male</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="my-2 p-2 card">
                                        <div className="d-flex justify-content-between">
                                            ADDRESS BOOK
                                            <Link href="#" className="primary">
                                                <Edit />
                                            </Link>
                                        </div>
                                        <hr />
                                        <span className="text-muted mb-2">Ibukunoluwa Naphtali</span>
                                        <span className="text-muted mb-2">No:14 bole street yola</span>
                                        <span className="text-muted mb-2">YOLA-CENTRAL LOCATIONS, Adamawa</span>
                                        <span className="text-muted mb-2">+234 9018398960 / +234 7039330833</span>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-sm-6">
                                    <div className="my-2 p-2">

                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="my-2 p-2 card">
                                        <div>NEWSLETTER</div>
                                        <hr />
                                        <span className="text-muted mb-2">You are currently not subscribed to any of our newsletters.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

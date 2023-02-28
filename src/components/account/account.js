import styles from '@/components/account/Account.module.css'
import { Edit } from 'iconsax-react';
import AccountNavbar from '@/components/account/navbar';
import Newsletter from '@/components/account/newsletter';
import AddressBook from '@/components/account/address_book';

export default function Account() {
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <AccountNavbar />

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
                                            <button
                                                type="button"
                                                className="primary trans border_none"
                                                data-bs-toggle="modal"
                                                data-bs-target="#addressBookModal"
                                            >
                                                <Edit />
                                            </button>
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
                                    <div className="my-2 p-2 card">
                                        <div>PAYMENT METHOD</div>
                                        <hr />
                                        <span className="text-muted mb-2 fw-bold">Card details</span>
                                        <span className="text-muted mb-2">1234 **** **** 5678</span>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="my-2 p-2 card">
                                        <div>NEWSLETTER</div>
                                        <hr />
                                        <span className="text-muted mb-2">You are currently not subscribed to any of our newsletters.</span>
                                        <button
                                            type="button"
                                            className="primary text-decoration-none mt-3 text-start trans border_none"
                                            data-bs-toggle="modal"
                                            data-bs-target="#newsletterModal"
                                        >
                                            EDIT NEWSLETTER PREFERENCES
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Newsletter />
                    <AddressBook />
                </div>
            </div>
        </>
    )
}

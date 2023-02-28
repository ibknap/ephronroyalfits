import styles from '@/components/account/Account.module.css'
import AccountNavbar from '@/components/account/navbar';
import Image from 'next/image';

export default function Saved() {
    return (
        <>
            <div className="container ">
                <div className="row justify-content-center">
                    <AccountNavbar />

                    <div className="col-md-8">
                        <div className="m-2 shadow p-3 rounded">
                            <div className={styles.card_header}>
                                My Donations
                            </div>
                            <div className="row mt-2">
                                <div className="col-12">
                                    <ul className="list-unstyled ">
                                        <li className="d-flex my-2 p-2 card flex-row position-relative">
                                            <Image
                                                src="/images/logo.png"
                                                alt="donation item image"
                                                className="rounded border"
                                                width={100}
                                                height={100}
                                            />
                                            <div className="mx-2 d-flex flex-column justify-content-between">
                                                <span className="secondary">Bag of rice 50kg</span>
                                                <span className="text-muted">₦ 25,000</span>
                                                <span className="text-muted">On: 27-02-2023</span>
                                            </div>
                                            <button type="button" className={`btn btn-lg btn-success shadow-sm ${styles.saved_donate}`}>Donate</button>
                                            <button type="button" className={`btn btn-lg btn-success ${styles.saved_remove}`}>Remove</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

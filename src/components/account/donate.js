import styles from '@/components/account/Account.module.css'
import AccountNavbar from '@/components/account/navbar';
import Image from 'next/image';

export default function Donate() {
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
                                                <span className="text-muted">ID: 1815893442</span>
                                                <span className="text-muted">Qty: 2</span>
                                                <span className="text-muted">On: 27-02-2023</span>
                                            </div>
                                            {/* <span className={`bg-warning white py-1 px-2 rounded ${styles.donate_status}`}>Pending</span> */}
                                            <span className={`bg-success white py-1 px-2 rounded ${styles.donate_status}`}>Delivered</span>
                                            {/* <span className={`bg-danger white py-1 px-2 rounded ${styles.donate_status}`}>cancelled</span> */}
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

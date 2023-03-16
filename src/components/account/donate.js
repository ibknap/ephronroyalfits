import styles from '@/components/account/Account.module.css'
import AccountNavbar from '@/components/account/navbar';
import Newsletter from '@/components/account/newsletter/newsletter';
import AddressBook from '@/components/account/address_book';
import { useAuth } from '@/firebase/fire_auth_context';
import Loader from '@/components/loader/loader';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/fire_config';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import { toast } from "react-toastify";
import { Gift } from 'iconsax-react';
import Link from 'next/link';
import NeedAuth from '@/components/restrictions/need_auth';

export default function Donate() {
    const [user, setUser] = useState(null);
    const [myDonations, setMyDonations] = useState([]);
    const { authUser } = useAuth();

    useEffect(() => {
        let unsubscribe = () => { };
        if (authUser) {
            const userRef = doc(db, "users", authUser.email);

            unsubscribe = onSnapshot(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    setUser(snapshot.data());
                } else {
                    toast.error("User data not found");
                }
            });
        }
        return () => { unsubscribe(); };
    }, [authUser]);

    useEffect(() => {
        let unsubscribe = () => { };
        if (authUser) {
            unsubscribe = onSnapshot(collection(db, "donations"), (snapshot) => {
                const data = [];

                snapshot.forEach((doc) => {
                    if (doc.data().email == authUser.email) {
                        data.push({
                            id: doc.id,
                            ...doc.data(),
                            addedOn: doc.data().addedOn.toDate().toLocaleDateString()
                        });
                    }
                });

                setMyDonations(data);
            });
        }

        return () => { unsubscribe(); };
    }, [authUser]);

    if (!authUser) return <NeedAuth />

    return (
        <div className="container ">
            <div className="row mb-5 justify-content-center">
                <AccountNavbar />

                {user
                    ? <>
                        <div className="col-md-8">
                            <div className="m-2 shadow p-3 rounded">
                                <div className={styles.card_header}>
                                    My Donations
                                </div>
                                <div className="row mt-2">
                                    <div className="col-12">
                                        {myDonations.length > 0 ? (
                                            <ul className="list-unstyled ">
                                                {myDonations.map((donation) => (
                                                    <li key={donation.id} className="d-flex my-2 p-2 card flex-row position-relative" >
                                                        <Link href={`/product/${donation.id}`} className="d-flex text-decoration-none">
                                                            <img
                                                                src={donation.image}
                                                                alt={donation.name}
                                                                className="rounded border"
                                                                width={100}
                                                                height={100}
                                                                style={{ objectFit: "cover" }}
                                                            />
                                                            <div className="w-75 mx-2 d-flex flex-column justify-content-between">
                                                                <span className="secondary">{donation.name}</span>
                                                                <span className="text-muted">ID: {donation.id}</span>
                                                                <span className="text-muted">On: {donation.addedOn}</span>
                                                            </div>
                                                        </Link>

                                                        {donation.status == "delivered" && < span className={`bg-success white py-1 px-2 rounded ${styles.donate_status}`}>Delivered</span>}
                                                        {donation.status == "cancelled" && <span className={`bg-danger white py-1 px-2 rounded ${styles.donate_status}`}>Cancelled</span>}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="text-center text-muted">
                                                <Gift size={100} variant="Bold" />
                                                <h5>No donation made yet.</h5>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Newsletter email={user.email} />
                        <AddressBook user={user} />
                    </>
                    : <div className="col-md-8">
                        <div className="m-2 shadow p-3 rounded">
                            <div className={styles.card_header}>
                                My Donations
                            </div>

                            <div className="row my-5 justify-content-center">
                                <div className="col-12 text-center">
                                    <Loader />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

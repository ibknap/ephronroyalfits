import styles from '@/components/account/Account.module.css'
import AccountNavbar from '@/components/account/navbar';
import Newsletter from '@/components/account/newsletter/newsletter';
import AddressBook from '@/components/account/address_book';
import { useAuth } from '@/firebase/fire_auth_context';
import Loader from '@/components/loader/loader';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/fire_config';
import { doc, collection, query, onSnapshot, where } from 'firebase/firestore';
import { toast } from "react-toastify";
import { Gift, Information } from 'iconsax-react';
import Link from 'next/link';

export default function Donate() {
    const [user, setUser] = useState(null);
    const [myDonations, setMyDonations] = useState([]);
    const [products, setProducts] = useState([]);
    const { authUser } = useAuth();

    useEffect(() => {
        let unsubscribe = () => { };
        if (authUser) {
            const userRef = doc(db, "users", authUser.email);

            unsubscribe = onSnapshot(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    setUser(snapshot.data());
                    setMyDonations(snapshot.data().myDonations);
                } else {
                    toast.error("User data not found");
                }
            });
        }
        return () => { unsubscribe(); };
    }, [authUser]);

    useEffect(() => {
        let unsubscribe = () => { };

        if (myDonations.length > 0) {
            const productIDs = myDonations.map((donation) => donation.productId);

            const productsRef = collection(db, "products");
            const q = query(productsRef, where("id", "in", productIDs));
            unsubscribe = onSnapshot(q, async (snapshot) => {
                const data = await Promise.all(snapshot.docs.map(async (doc) => {
                    let productStatus = "";

                    myDonations.map((donation) => { if (doc.id == donation.productId) productStatus = donation.status; })

                    return {
                        id: doc.id,
                        ...doc.data(),
                        status: productStatus,
                        addedOn: doc.data().addedOn.toDate().toLocaleTimeString()
                    };
                }));
                setProducts(data);
            });
        }
        return () => { unsubscribe(); };
    }, [user, myDonations]);

    if (!authUser) {
        return (
            <div className="container">
                <div className="row my-5 justify-content-center">
                    <div className="col-12 text-muted text-center">
                        <Information variant="Bold" size={200} />
                        <p>You need to be logged in to see this page.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
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
                                            {products.length > 0 ? (
                                                <ul className="list-unstyled ">
                                                    {products.map((donation) => (
                                                        <li key={donation.id} className="d-flex my-2 p-2 card flex-row position-relative" >
                                                            <Link href={`/product/${donation.id}`} className="d-flex text-decoration-none">
                                                                <img
                                                                    src={donation.image}
                                                                    alt={donation.name}
                                                                    className="rounded border"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                                <div className="w-75 mx-2 d-flex flex-column justify-content-between">
                                                                    <span className="secondary">{donation.name}</span>
                                                                    <span className="text-muted">ID: {donation.id}</span>
                                                                    <span className="text-muted">On: {donation.addedOn}</span>
                                                                </div>
                                                            </Link>

                                                            {donation.status == "pending" && <span className={`bg-warning white py-1 px-2 rounded ${styles.donate_status}`}>Pending</span>}
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
        </>
    )
}

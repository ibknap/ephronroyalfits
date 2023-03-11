import styles from '@/components/account/Account.module.css'
import AccountNavbar from '@/components/account/navbar';
import Newsletter from '@/components/account/newsletter/newsletter';
import AddressBook from '@/components/account/address_book';
import { useSaved } from "@/components/account/saved/saved_context";
import { Heart, Information } from 'iconsax-react';
import toCurrency from '@/components/utils/toCurrency'
import Link from 'next/link';
import { useAuth } from '@/firebase/fire_auth_context';
import Loader from '@/components/loader/loader';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/fire_config';
import { doc, onSnapshot } from 'firebase/firestore';
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

export default function Saved() {
    const { savedItems, removeSavedItem } = useSaved();
    const [user, setUser] = useState(null);
    const { authUser } = useAuth();

    useEffect(() => {
        if (authUser) {
            const userRef = doc(db, "users", authUser.email);

            const unsubscribe = onSnapshot(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    setUser(snapshot.data());
                } else {
                    toast.error("User data not found");
                }
            });

            return () => { unsubscribe(); };
        }
    }, [authUser]);

    if (!authUser && !Cookies.get("NEFBSignedIn")) {
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
                                        Saved
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12">
                                            {savedItems.length > 0 ? (
                                                <ul className="list-unstyled ">
                                                    {savedItems.map((item) => (
                                                        <li key={item.id} className="d-flex my-2 p-2 card position-relative">
                                                            <Link href={`/product/${item.id}`} className="d-flex text-decoration-none">
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="rounded border"
                                                                    width={100}
                                                                    height={100}
                                                                />
                                                                <div className="w-75 mx-2 d-flex flex-column justify-content-between">
                                                                    <span className="secondary">{item.name}</span>
                                                                    <span className="text-muted">{toCurrency(item.price)}</span>
                                                                    <span className="text-muted">On: {item.addedOn}</span>
                                                                </div>
                                                            </Link>
                                                            <button type="button" className={`btn btn-lg btn-success shadow-sm ${styles.saved_donate}`}>Donate</button>
                                                            <button type="button" className={`btn btn-lg btn-success ${styles.saved_remove}`} onClick={() => removeSavedItem(item.id)}>
                                                                Remove
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className="text-center text-muted">
                                                    <Heart size={100} variant="Bold" />
                                                    <h5>No saved items yet.</h5>
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
                                    Saved
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
            </div>
        </>
    )
}

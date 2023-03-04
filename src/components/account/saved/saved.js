import styles from '@/components/account/Account.module.css'
import AccountNavbar from '@/components/account/navbar';
import Newsletter from '@/components/account/newsletter';
import AddressBook from '@/components/account/address_book';
import Image from 'next/image';
import { useSaved } from "@/components/account/saved/saved_context";
import { Heart } from 'iconsax-react';
import toCurrency from '@/components/utils/toCurrency'

export default function Saved() {
    const { savedItems, removeSavedItem } = useSaved();

    return (
        <>
            <div className="container ">
                <div className="row justify-content-center">
                    <AccountNavbar />

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
                                                <li key={item.id} className="d-flex my-2 p-2 card flex-row position-relative">
                                                    <Image
                                                        src="/images/logo.png"
                                                        alt="donation item image"
                                                        className="rounded border"
                                                        width={100}
                                                        height={100}
                                                        priority
                                                    />
                                                    <div className="w-75 mx-2 d-flex flex-column justify-content-between">
                                                        <span className="secondary">{item.name}</span>
                                                        <span className="text-muted">{toCurrency(item.price)}</span>
                                                        <span className="text-muted">On: {item.addedOn}</span>
                                                    </div>
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

                    <Newsletter />
                    <AddressBook />
                </div>
            </div>
        </>
    )
}

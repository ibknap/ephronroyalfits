import styles from "@/components/account/Account.module.css";
import AccountNavbar from "@/components/account/navbar";
import AddressBook from "@/components/account/address_book";
import { useSaved } from "@/components/account/saved/saved_context";
import { Heart } from "iconsax-react";
import toCurrency from "@/components/utils/toCurrency";
import Link from "next/link";
import { useAuth } from "@/firebase/fire_auth_context";
import Loader from "@/components/loader/loader";
import { useState, useEffect } from "react";
import { db } from "@/firebase/fire_config";
import { doc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import NeedAuth from "@/components/restrictions/need_auth";
import { useCart } from "@/components/cart/cart_context";
import { truncate } from "@/components/utils/truncate";
import { formatTimestamp } from "@/components/utils/format_timestamp";

export default function Saved() {
  const { addItem, isInCart } = useCart();
  const { savedItems, removeSavedItem } = useSaved();
  const [user, setUser] = useState(null);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const userRef = doc(db, "users", authUser.email);
      const unsubscribe = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists()) setUser(snapshot.data());
        else toast.error("User not found");
      });

      return () => unsubscribe();
    }
  }, [authUser]);

  if (!authUser) return <NeedAuth />;

  return (
    <div className="container">
      <div className="row mb-5 justify-content-center">
        <AccountNavbar />

        {user ? (
          <>
            <div className="col-md-8 p-0">
              <div className="m-2 shadow-sm p-2">
                <div className={styles.card_header}>Saved</div>
                <div className="row mt-2">
                  <div className="col-12">
                    {savedItems.length > 0 ? (
                      <ul className="list-unstyled ">
                        {savedItems.map((item) => (
                          <li
                            key={item.id}
                            className="d-flex my-2 p-2 card rounded-0 position-relative"
                          >
                            <Link
                              href={`/product/${item.id}`}
                              className="d-flex text-decoration-none"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                width={100}
                                height={100}
                                style={{ objectFit: "cover" }}
                              />
                              <div className="w-75 mx-2 d-flex flex-column justify-content-between">
                                <span className="text-dark">
                                  {truncate(item.name, 40)}
                                </span>
                                <span className="text-muted">
                                  {toCurrency(item.price)}
                                </span>
                                <span className="text-muted">
                                  On: {formatTimestamp(item.addedOn)}
                                </span>
                              </div>
                            </Link>
                            {!isInCart(item.id) && (
                              <button
                                type="button"
                                onClick={() => addItem(item)}
                                className={`btn btn-primary rounded-0 border-0 ${styles.saved_order}`}
                              >
                                Add
                              </button>
                            )}

                            <button
                              type="button"
                              className={`btn ${styles.saved_remove}`}
                              onClick={() => removeSavedItem(item.id)}
                            >
                              Remove
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center text-muted">
                        <Heart
                          size={100}
                          variant="Bulk"
                          className="primary mb-3"
                        />
                        <p>No saved items yet.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <AddressBook user={user} />
          </>
        ) : (
          <div className="col-md-8 p-0">
            <div className="m-2 shadow-sm p-2">
              <div className={styles.card_header}>Saved</div>

              <div className="row my-5 justify-content-center">
                <div className="col-12 text-center">
                  <Loader />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

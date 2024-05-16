import styles from "@/components/account/Account.module.css";
import AccountNavbar from "@/components/account/navbar";
import AddressBook from "@/components/account/address_book";
import { useAuth } from "@/firebase/fire_auth_context";
import Loader from "@/components/loader/loader";
import { useState, useEffect } from "react";
import { db } from "@/firebase/fire_config";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { Bag2 } from "iconsax-react";
import Link from "next/link";
import NeedAuth from "@/components/restrictions/need_auth";

export default function Orders() {
  const [user, setUser] = useState(null);
  const [myOrders, setMyOrders] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    let unsubscribe = () => {};
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
    return () => {
      unsubscribe();
    };
  }, [authUser]);

  useEffect(() => {
    let unsubscribe = () => {};
    if (authUser) {
      unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
        const data = [];

        snapshot.forEach((doc) => {
          if (doc.data().email == authUser.email) {
            data.push({
              id: doc.id,
              ...doc.data(),
              addedOn: doc.data().addedOn.toDate().toLocaleDateString(),
            });
          }
        });

        setMyOrders(data);
      });
    }

    return () => {
      unsubscribe();
    };
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
                <div className={styles.card_header}>My Orders</div>
                <div className="row mt-2">
                  <div className="col-12">
                    {myOrders.length > 0 ? (
                      <ul className="list-unstyled ">
                        {myOrders.map((order) => (
                          <li
                            key={order.id}
                            className="d-flex my-2 p-2 card flex-row position-relative"
                          >
                            <Link
                              href={`/product/${order.id}`}
                              className="d-flex text-decoration-none"
                            >
                              <img
                                src={order.image}
                                alt={order.name}
                                className="rounded border"
                                width={100}
                                height={100}
                                style={{ objectFit: "cover" }}
                              />
                              <div className="w-75 mx-2 d-flex flex-column justify-content-between">
                                <span className="primary fw-bold">{order.name}</span>
                                <span className="text-muted">
                                  ID: {order.id}
                                </span>
                                <span className="text-muted">
                                  On: {order.addedOn}
                                </span>
                              </div>
                            </Link>

                            {order.status == "delivered" && (
                              <span
                                className={`bg-success white py-1 px-2 rounded ${styles.order_status}`}
                              >
                                Delivered
                              </span>
                            )}
                            {order.status == "cancelled" && (
                              <span
                                className={`bg-danger white py-1 px-2 rounded ${styles.order_status}`}
                              >
                                Cancelled
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center text-muted">
                        <Bag2 size={100} variant="Bulk" />
                        <h5>No order made yet.</h5>
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
              <div className={styles.card_header}>My Orders</div>

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

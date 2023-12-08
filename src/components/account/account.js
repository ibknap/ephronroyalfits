import styles from "@/components/account/Account.module.css";
import { Edit } from "iconsax-react";
import AccountNavbar from "@/components/account/navbar";
import AddressBook from "@/components/account/address_book";
import { useAuth } from "@/firebase/fire_auth_context";
import Loader from "@/components/loader/loader";
import { useState, useEffect } from "react";
import { db } from "@/firebase/fire_config";
import { doc, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import NeedAuth from "@/components/restrictions/need_auth";

export default function Account() {
  const [user, setUser] = useState(null);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const userRef = doc(db, "users", authUser.email);
      const unsubscribe = onSnapshot(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.data());
        } else toast.error("User data not found");
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
                <div className={styles.card_header}>My Account</div>

                <div className="row mt-2">
                  <div className="col-sm-6">
                    <div className="my-2 p-2 card rounded-0">
                      <div>ACCOUNT DETAILS</div>
                      <hr />
                      <span className="text-muted mb-2">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="text-muted mb-2">{user.email}</span>
                      <span className="text-muted mb-2">
                        {user.phoneNumber}
                      </span>
                      <span className="text-muted mb-2">
                        {user.gender.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="my-2 p-2 card rounded-0">
                      <div className="d-flex justify-content-between">
                        ADDRESS BOOK
                        <button
                          type="button"
                          className="primary trans border-0"
                          data-bs-toggle="modal"
                          data-bs-target="#addressBookModal"
                        >
                          <Edit />
                        </button>
                      </div>
                      <hr />
                      <span className="text-muted mb-2">
                        {user.addressBook.firstName} {user.addressBook.lastName}
                      </span>
                      <span className="text-muted mb-2">
                        {user.addressBook.address}
                      </span>
                      <span className="text-muted mb-2">
                        {user.addressBook.additionalInformation}
                      </span>
                      <span className="text-muted mb-2">
                        {user.addressBook.phoneNumber} /{" "}
                        {user.addressBook.additionalPhoneNumber}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-sm-6">
                    <div className="my-2 p-2 card rounded-0">
                      <div>PAYMENT METHOD</div>
                      <hr />
                      <span className="text-muted mb-2">
                        &#12539; Debit/credit card
                      </span>
                      <span className="text-muted mb-2">
                        &#12539; Bank transfer
                      </span>
                      <span className="text-muted mb-2">
                        &#12539; USSD transfer
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AddressBook user={user} />
          </>
        ) : (
          <div className="col-md-8 p-0">
            <div className="m-2 shadow-sm p-2">
              <div className={styles.card_header}>My Account</div>

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

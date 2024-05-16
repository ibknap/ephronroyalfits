import styles from "@/components/account/Account.module.css";
import { useState } from "react";
import { useAuth } from "@/firebase/fire_auth_context";
import { db } from "@/firebase/fire_config";
import { toast } from "react-toastify";
import Loader from "@/components/loader/loader";
import { doc, updateDoc } from "firebase/firestore";

export default function AddressBook({ user }) {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const { authUser } = useAuth();

  const onUpdateAddrBook = async (e) => {
    e.preventDefault();
    setLoading(true);

    const docRef = doc(db, "users", authUser.email);
    await updateDoc(docRef, {
      "addressBook.firstName":
        firstName.length <= 0 ? user.firstName : firstName.toLowerCase(),
      "addressBook.lastName":
        lastName.length <= 0 ? user.lastName : lastName.toLowerCase(),
      "addressBook.phoneNumber":
        phoneNumber.length <= 0 ? user.phoneNumber : phoneNumber,
      "addressBook.additionalPhoneNumber": additionalPhoneNumber,
      "addressBook.address": address,
      "addressBook.additionalInformation": additionalInformation,
    })
      .then(() => toast.success("Address book updated"))
      .catch((e) => {
        if (e.code == "not-found") toast.error("User not found");
        else toast.error(`Something is wrong: ${e.message}`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className="modal fade"
      id="addressBookModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="addressBookModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0 mb-0">
            <h6 className="modal-title" id="addressBookModalLabel">
              Address Book
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <form onSubmit={onUpdateAddrBook}>
            <div className="modal-body p-3">
              <div className="d-flex">
                <div className="col-sm-6">
                  <div className="me-2">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="firstName"
                      placeholder={user.addressBook.firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="lastName"
                    placeholder={user.addressBook.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex mt-3">
                <div className="col-sm-6">
                  <div className="me-2">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      id="phoneNumber"
                      placeholder={user.phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="additionalPhoneNumber"
                    placeholder="Additional Phone Number"
                    onChange={(e) => setAdditionalPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-12 mt-3">
                <input
                  type="text"
                  required
                  className="form-control rounded-0"
                  id="address"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="col-12 mt-3">
                <textarea
                  className="form-control rounded-0"
                  required
                  placeholder="Additional Information"
                  id="additionalInformation"
                  style={{ height: "100px" }}
                  onChange={(e) => setAdditionalInformation(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer border-0 mt-0 pt-0">
              <button type="submit" className="btn btn-primary rounded-0 border-0">
                {loading ? <Loader /> : "Save Address"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

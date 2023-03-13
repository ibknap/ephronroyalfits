import styles from '@/components/account/Account.module.css'
import { useState } from 'react';
import { useAuth } from '@/firebase/fire_auth_context';
import { db } from '@/firebase/fire_config';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { doc, updateDoc } from 'firebase/firestore';

export default function AddressBook({ user }) {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [additionalInformation, setAdditionalInformation] = useState("");
    const { authUser } = useAuth();


    const onUpdateAddrBook = async event => {
        event.preventDefault();
        setLoading(true);

        const docRef = doc(db, "users", authUser.email);
        await updateDoc(docRef, {
            "addressBook.firstName": firstName.length <= 0 ? user.firstName : firstName,
            "addressBook.lastName": lastName.length <= 0 ? user.lastName : lastName,
            "addressBook.phoneNumber": phoneNumber.length <= 0 ? user.phoneNumber : phoneNumber,
            "addressBook.additionalPhoneNumber": additionalPhoneNumber,
            "addressBook.address": address,
            "addressBook.additionalInformation": additionalInformation,

        }).then(() => {
            toast.success("Updated Address Book.");
            setLoading(false);
        }).catch((error) => {
            if (error.code == "not-found") {
                toast.error("User not found");
                setLoading(false);
            } else {
                toast.error(`Something is wrong: ${error.message}`);
                setLoading(false);
            }
        });
    };

    return (
        <div className="modal fade" id="addressBookModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addressBookModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addressBookModalLabel">Address Book</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={onUpdateAddrBook}>
                        <div className="modal-body">
                            <div className="d-flex">
                                <div className="col-sm-6">
                                    <div className="form-floating mx-2">
                                        <input type="text"
                                            className="form-control"
                                            id="firstName"
                                            placeholder={user.firstName}
                                            onChange={(event) => setFirstName(event.target.value)}
                                        />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mx-2">
                                        <input type="text"
                                            className="form-control"
                                            id="lastName"
                                            placeholder={user.lastName}
                                            onChange={(event) => setLastName(event.target.value)}
                                        />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex mt-3">
                                <div className="col-sm-6">
                                    <div className="form-floating mx-2">
                                        <input type="text"
                                            className="form-control"
                                            id="phoneNumber"
                                            placeholder={user.phoneNumber}
                                            onChange={(event) => setPhoneNumber(event.target.value)}
                                        />
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mx-2">
                                        <input type="text"
                                            className="form-control"
                                            id="additionalPhoneNumber"
                                            placeholder="7012345678"
                                            onChange={(event) => setAdditionalPhoneNumber(event.target.value)}
                                        />
                                        <label htmlFor="additionalPhoneNumber">Additional Phone Number</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <div className="form-floating mx-2">
                                    <input type="text"
                                        required
                                        className="form-control"
                                        id="addr"
                                        placeholder="Block 123"
                                        onChange={(event) => setAddress(event.target.value)}
                                    />
                                    <label htmlFor="addr">Address</label>
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <div className="form-floating">
                                    <textarea className="form-control"
                                        required
                                        placeholder="Enter Additional Information"
                                        id="additionalInformation"
                                        style={{ height: "100px" }}
                                        onChange={(event) => setAdditionalInformation(event.target.value)}
                                    ></textarea>
                                    <label htmlFor="additionalInformation">Additional Information</label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className={`btn btn-lg btn-success ${styles.btn_nav}`}>
                                {loading ? <Loader /> : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
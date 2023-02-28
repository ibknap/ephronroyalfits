import styles from '@/components/account/Account.module.css'

export default function AddressBook() {
    return (
        <>
            <div className="modal fade" id="addressBookModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addressBookModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addressBookModalLabel">Address Book</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="d-flex">
                                    <div className="col-sm-6">
                                        <div className="form-floating mx-2">
                                            <input type="text" required className="form-control" id="firstName" placeholder="Jon" />
                                            <label htmlFor="firstName">First Name</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating mx-2">
                                            <input type="text" required className="form-control" id="lastName" placeholder="Doe" />
                                            <label htmlFor="lastName">Last Name</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex mt-3">
                                    <div className="col-sm-6">
                                        <div className="form-floating mx-2">
                                            <input type="text" required className="form-control" id="phoneNumber" placeholder="7012345678" />
                                            <label htmlFor="phoneNumber">Phone Number</label>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-floating mx-2">
                                            <input type="text" className="form-control" id="addPhoneNumber" placeholder="7012345678" />
                                            <label htmlFor="addPhoneNumber">Additional Phone Number</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 mt-3">
                                    <div className="form-floating mx-2">
                                        <input type="text" required className="form-control" id="deliveryAddr" placeholder="Block 123" />
                                        <label htmlFor="deliveryAddr">Delivery Address</label>
                                    </div>
                                </div>
                                <div className="col-12 mt-3">
                                    <div className="form-floating">
                                        <textarea className="form-control" required placeholder="Enter Additional Information" id="additionalInfo" style={{ height: "100px" }}></textarea>
                                        <label for="additionalInfo">Additional Information</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className={`btn btn-lg btn-success ${styles.btn_nav}`}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
import styles from '@/components/account/Account.module.css'
import { useState } from 'react';
import { db } from '@/firebase/fire_config';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function CreateProduct() {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [isHealth, setIsHealth] = useState(false);
    const [description, setDescription] = useState("");

    function onKeyDown(event) {
        const keyCode = event.which || event.keyCode;
        const keyValue = String.fromCharCode(keyCode);
        if (/\D/.test(keyValue)) event.preventDefault();
    }

    const onCreateProduct = async event => {
        event.preventDefault();
        setLoading(true);

        const docRef = doc(collection(db, "products"))
        const newProduct = {
            id: docRef.id,
            image: image,
            name: name,
            name_query: name.toLowerCase(),
            price: parseFloat(price),
            isHealth: isHealth,
            numOfDonation: 0,
            description: description,
            addedOn: serverTimestamp(),

        };

        await setDoc(docRef, newProduct).then(() => {
            toast.success(`Added New Product ${name}`);
            setLoading(false);
        }).catch((error) => {
            toast.error(`Something is wrong: ${error.message}`);
            setLoading(false);
        });
    };

    return (
        <div className="modal fade" id="createProduct" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="createProductLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createProductLabel">Create New Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={onCreateProduct}>
                        <div className="modal-body">
                            <div className="d-flex">
                                <div className="col-sm-6">
                                    <div className="form-floating mx-2">
                                        <input type="text"
                                            className="form-control"
                                            id="image"
                                            placeholder="Image"
                                            onChange={(event) => setImage(event.target.value)}
                                        />
                                        <label htmlFor="image">Image</label>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-floating mx-2">
                                        <input type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Name"
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                        <label htmlFor="name">Name</label>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex mt-3">
                                <div className="col-sm-6">
                                    <div className="form-floating mx-2">
                                        <input type="text"
                                            className="form-control"
                                            id="price"
                                            placeholder="Price"
                                            onChange={(event) => setPrice(event.target.value)}
                                            onKeyDown={onKeyDown}
                                        />
                                        <label htmlFor="price">Price</label>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-floating mx-2">
                                        <select
                                            className="form-select"
                                            required
                                            id="type"
                                            onChange={(event) => setIsHealth(event.target.value === "true")}
                                        >
                                            <option value={false}>Food</option>
                                            <option value={true}>Nutrition</option>
                                        </select>
                                        <label htmlFor="type">Type</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 mt-3">
                                <div className="form-floating">
                                    <textarea className="form-control"
                                        required
                                        placeholder="Description"
                                        id="description"
                                        style={{ height: "200px" }}
                                        onChange={(event) => setDescription(event.target.value)}
                                    ></textarea>
                                    <label htmlFor="description">Description</label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="submit" className={`btn btn-lg btn-success ${styles.btn_nav}`}>
                                {loading ? <Loader /> : "Add Product"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
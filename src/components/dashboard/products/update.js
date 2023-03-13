import styles from '@/components/account/Account.module.css'
import { useState } from 'react';
import { db } from '@/firebase/fire_config';
import { toast } from "react-toastify";
import Loader from '@/components/loader/loader';
import { doc, updateDoc } from 'firebase/firestore';

export default function UpdateProduct({ product }) {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [isHealth, setIsHealth] = useState(null);
    const [description, setDescription] = useState("");

    const onUpdateProduct = async event => {
        event.preventDefault();
        setLoading(true);

        const docRef = doc(db, "products", product.id);

        await updateDoc(docRef, {
            "image": image != null ? image : product.image,
            "name": name.length <= 0 ? product.name : name,
            "name_query": name.length <= 0 ? product.name_query : name.toLowerCase(),
            "price": price.length <= 0 ? product.price : price,
            "isHealth": isHealth != null ? isHealth : product.isHealth,
            "description": description.length <= 0 ? product.description : description,

        }).then(() => {
            toast.success(`Updated ${name.length <= 0 && product.name}`);
            setLoading(false);
        }).catch((error) => {
            if (error.code == "not-found") {
                toast.error("Product not found");
                setLoading(false);
            } else {
                toast.error(`Something is wrong: ${error.message}`);
                setLoading(false);
            }
        });
    };

    return (
        <div className="modal fade" id="updateProduct" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="updateProductLabel" aria-hidden="true" style={{ zIndex: 99999 }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="updateProductLabel">Update Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={onUpdateProduct}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-floating">
                                        <input type="text"
                                            className="form-control"
                                            id="image"
                                            placeholder="Image (option)"
                                            onChange={(event) => setImage(event.target.value)}
                                        />
                                        <label htmlFor="image">Image (option)</label>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-floating">
                                        <input type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Name (option)"
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                        <label htmlFor="name">Name (option)</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-6">
                                    <div className="form-floating">
                                        <input type="text"
                                            className="form-control"
                                            id="price"
                                            placeholder="Price (option)"
                                            onChange={(event) => setPrice(event.target.value)}
                                        />
                                        <label htmlFor="price">Price (option)</label>
                                    </div>
                                </div>

                                <div className="col-6">
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
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
                                        placeholder="Description (option)"
                                        id="description"
                                        style={{ height: "200px" }}
                                        onChange={(event) => setDescription(event.target.value)}
                                    ></textarea>
                                    <label htmlFor="description">Description (option)</label>
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
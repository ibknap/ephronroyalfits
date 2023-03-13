import { Edit2, Trash } from 'iconsax-react';
import Link from 'next/link';
import { db } from '@/firebase/fire_config';
import { useState, useEffect } from 'react';
import toCurrency from '@/components/utils/toCurrency'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import ProductSearch from '@/components/dashboard/products/search';
import CreateProduct from '@/components/dashboard/products/create';

export default function DashboardProducts() {
    const [products, setProducts] = useState([]);

    // listening to product
    useEffect(() => {
        const q = query(collection(db, "products"), orderBy("addedOn", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });

            setProducts(data);
        });

        return () => { unsubscribe(); };
    }, []);

    return (
        <div className="dashboard_content">
            <div className="container mb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div className="row justify-content-between">
                                <div className="col-sm-6 text-start">
                                    <h4>Products</h4>
                                    <small className="text-muted">Create, update and view products</small>
                                </div>

                                <div className="col-sm-6 text-end">
                                    <button type="button"
                                        className="btn btn-warning"
                                        data-bs-toggle="modal"
                                        data-bs-target="#createProduct"
                                    >
                                        Create Product
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <ProductSearch />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div>
                                All Products
                                <hr />
                            </div>

                            {products &&
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Type</th>
                                                <th scope="col">Edit</th>
                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.length > 0 && products.map((product) => (
                                                <tr key={product.id}>
                                                    <th scope="row">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            width={50}
                                                            height={50}
                                                            style={{ objectFit: "cover" }}
                                                            className="rounded border"
                                                            crossOrigin="anonymous"
                                                        />
                                                    </th>
                                                    <td className="d-table-cell align-middle">{product.name}</td>
                                                    <td className="d-table-cell align-middle">{toCurrency(product.price)}</td>
                                                    <td className="d-table-cell align-middle">{product.isHealth ? "Nutrition" : "Food"}</td>
                                                    <td className="d-table-cell align-middle">
                                                        <Link href={`/dashboard/product_update/${product.id}`} className="text-decoration-none btn btn-sm border_none btn-warning">
                                                            Edit <Edit2 />
                                                        </Link>
                                                    </td>
                                                    <td className="d-table-cell align-middle">
                                                        <button onClick={() => { }} className="text-decoration-none btn btn-sm border_none btn-danger">
                                                            Delete <Trash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <CreateProduct />
        </div>
    )
}
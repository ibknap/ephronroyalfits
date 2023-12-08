import Link from 'next/link';
import { db } from '@/firebase/fire_config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import toCurrency from '@/components/utils/toCurrency'
import { useState, useEffect } from 'react';
import ViewCartDonation from '@/components/dashboard/orders/view';

export default function DashboardOrders() {
    const [orders, setOrders] = useState([]);
    const [selectedDonation, setSelectedDonation] = useState(null);

    // listening to orders
    useEffect(() => {
        const q = query(collection(db, "orders"), orderBy("addedOn", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });

            setOrders(data);
        });

        return () => { unsubscribe(); };
    }, []);

    return (
        <div className="dashboard_content">
            <div className="container mb-5">
                <div className="row">
                    <div className="col-12">
                        <div className="m-2 p-2 border-0 card shadow-sm">
                            <div className="row justify-content-between">
                                <div className="col-sm-6 text-start">
                                    <h4>Orders</h4>
                                    <small className="text-muted">Update and view orders</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="m-2 p-2 border-0 card shadow-sm">
                            <div>
                                All Orders
                                <hr />
                            </div>

                            {orders &&
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">By</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Product</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.length > 0 && orders.map((order) => (
                                                <tr key={order.id}>
                                                    <th scope="row">
                                                        <img
                                                            src={order.image}
                                                            alt={order.name}
                                                            width={50}
                                                            height={50}
                                                            style={{ objectFit: "cover" }}
                                                            className="rounded border"
                                                        />
                                                    </th>
                                                    <td className="d-table-cell align-middle">{order.name}</td>
                                                    <td className="d-table-cell align-middle">{toCurrency(order.amount)}</td>
                                                    <td className="d-table-cell align-middle">{order.email}</td>
                                                    <td className={`d-table-cell align-middle ${order.isCompleted ? "text-success" : "text-danger"}`}>
                                                        {order.isCompleted ? "Completed" : "Failed"}
                                                    </td>
                                                    <td className="d-table-cell align-middle">
                                                        <button
                                                            type="button"
                                                            onClick={() => { }}
                                                            className={`btn btn-sm border-0
                                                            ${order.status == "delivered" ? "btn-success"
                                                                    : order.status == "cancelled" ? "btn-danger"
                                                                        : "btn-dark"}`}
                                                        >
                                                            {order.status}
                                                        </button>
                                                    </td>
                                                    <td className="d-table-cell align-middle">
                                                        {order.items
                                                            ? <button type="button" data-bs-toggle="modal" data-bs-target="#viewCartDonation" onClick={() => { setSelectedDonation(order) }} className="btn btn-dark">
                                                                View Items
                                                            </button>
                                                            : <Link href={`/product/${order.id}`} target="_blank" className="primary">{order.id}</Link>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <ViewCartDonation order={selectedDonation} />
            {/* <div className="modal fade" id="viewCartDonation" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">

                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
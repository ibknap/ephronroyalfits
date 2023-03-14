import Link from 'next/link';
import Loader from '@/components/loader/loader';
import { toast } from "react-toastify";
import { db } from '@/firebase/fire_config';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import toCurrency from '@/components/utils/toCurrency'
import { useState, useEffect } from 'react';

export default function DashboardDonations() {
    const [loading, setLoading] = useState(false);
    const [donations, setDonations] = useState([]);

    // listening to donation
    useEffect(() => {
        const q = query(collection(db, "donations"), orderBy("addedOn", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });

            setDonations(data);
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
                                    <h4>Donations</h4>
                                    <small className="text-muted">Update and view donations</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div>
                                All Donations
                                <hr />
                            </div>

                            {donations &&
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
                                            {donations.length > 0 && donations.map((donation) => (
                                                <tr key={donation.id}>
                                                    <th scope="row">
                                                        <img
                                                            src={donation.image}
                                                            alt={donation.name}
                                                            width={50}
                                                            height={50}
                                                            style={{ objectFit: "cover" }}
                                                            className="rounded border"
                                                        />
                                                    </th>
                                                    <td className="d-table-cell align-middle">{donation.name}</td>
                                                    <td className="d-table-cell align-middle">{toCurrency(donation.amount)}</td>
                                                    <td className="d-table-cell align-middle">{donation.email}</td>
                                                    <td className={`d-table-cell align-middle ${donation.isCompleted ? "text-success" : "text-danger"}`}>
                                                        {donation.isCompleted ? "Completed" : "Failed"}
                                                    </td>
                                                    <td className="d-table-cell align-middle">
                                                        <button
                                                            type="button"
                                                            onClick={() => { }}
                                                            className={`btn btn-sm border_none
                                                            ${donation.status == "delivered" ? "btn-success"
                                                                    : donation.status == "cancelled" ? "btn-danger"
                                                                        : "btn-dark"}`}
                                                        >
                                                            {donation.status}
                                                        </button>
                                                    </td>
                                                    <td className="d-table-cell align-middle">
                                                        <Link href={`/product/${donation.id}`} target="_blank" className="primary">{donation.id}</Link>
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
        </div>
    )
}
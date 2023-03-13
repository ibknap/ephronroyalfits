import { Eye, Lock, UserOctagon } from 'iconsax-react';
import Link from 'next/link';
import { db } from '@/firebase/fire_config';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import UserSearch from '@/components/dashboard/users/search';

export default function DashboardUsers() {
    const [users, setUsers] = useState([]);

    // listening to users
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });

            setUsers(data);
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
                                    <h4>Users</h4>
                                    <small className="text-muted">Create, update, export and view users</small>
                                </div>

                                <div className="col-sm-6 text-end">
                                    <button type="button" className="btn btn-info mx-1" onClick={() => { }}>
                                        Export CSV
                                    </button>
                                    <button type="button" className="btn btn-warning mx-1" onClick={() => { }}>
                                        Create User
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <UserSearch />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="m-2 p-2 border_none card shadow-sm">
                            <div>
                                All Users
                                <hr />
                            </div>

                            {users &&
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Gender</th>
                                                <th scope="col">View</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.length > 0 && users.map((user) => (
                                                <tr key={user.id}>
                                                    <th scope="row">
                                                        <UserOctagon variant="Bold" className="secondary" size={50} />
                                                    </th>
                                                    <td className="d-table-cell align-middle">{user.firstName}</td>
                                                    <td className="d-table-cell align-middle">{user.email}</td>
                                                    <td className="d-table-cell align-middle">{user.gender}</td>
                                                    <td className="d-table-cell align-middle">
                                                        <Link href={`/dashboard/user_update/${user.email}`} className="text-decoration-none btn btn-sm border_none btn-warning">
                                                            View <Eye />
                                                        </Link>
                                                    </td>
                                                    <td className="d-table-cell align-middle">
                                                        <button onClick={() => { }} className="text-decoration-none btn btn-sm border_none btn-danger">
                                                            Disable <Lock />
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
        </div>
    )
}
import styles from '@/components/dashboard/Dashboard.module.css'
import { query, where, getDocs, collection, orderBy, limit } from "firebase/firestore";
import { useState } from "react";
import { Eye, Lock, SearchNormal, ShieldSecurity, UserOctagon } from 'iconsax-react'
import { db } from '@/firebase/fire_config';
import Link from 'next/link';

export default function UserSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const onSearch = async (e) => {
        setSearchTerm(e.target.value)

        if (searchTerm.length > 0) {
            const q = query(
                collection(db, "users"),
                where("firstName_query", ">=", searchTerm.toLowerCase()),
                where("firstName_query", "<=", searchTerm.toLowerCase() + "\uf8ff"),
                orderBy("firstName_query"),
                limit(10)
            );

            const querySnapshot = await getDocs(q);
            const results = [];

            querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });

            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    return (
        <>
            <div className={`${styles.search_form} me-auto mb-2 mb-md-0`}>
                <input
                    className={`form-control ${styles.input_search}`}
                    type="search"
                    placeholder="Search User By First Name"
                    aria-label="Search User By First Name"
                    value={searchTerm}
                    onChange={onSearch}
                />

                {/* <button
                    className={`btn btn-lg btn-success ${styles.btn_nav} px-3 py-2`}
                    type="button"
                    onClick={onSearch}
                >
                    <span className="d-flex">
                        <span className={styles.show_search_text}>SEARCH</span>
                        <SearchNormal size="24" className="mx-2" />
                    </span>
                </button> */}
            </div>

            {searchResults.length > 0 && searchTerm.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Gender</th>
                                <th scope="col">View</th>
                                <th scope="col">Accessibility</th>
                                <th scope="col">Visibility</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults.length > 0 && searchResults.map((result) => (
                                <tr key={result.id}>
                                    <th scope="row">
                                        <UserOctagon variant="Bold" className="secondary" size={50} />
                                    </th>
                                    <td className="d-table-cell align-middle">{result.firstName}</td>
                                    <td className="d-table-cell align-middle">{result.email}</td>
                                    <td className="d-table-cell align-middle">{result.gender}</td>
                                    <td className="d-table-cell align-middle">
                                        <Link href={`/dashboard/user_update/${result.email}`} className="text-decoration-none btn btn-sm border_none btn-warning">
                                            View <Eye />
                                        </Link>
                                    </td>
                                    <td className="d-table-cell align-middle">
                                        <button onClick={() => { }} className={`text-decoration-none btn btn-sm border_none ${result.isAdmin ? "btn-info" : "btn-dark"}`}>
                                            {result.isAdmin ? "Make User" : "Make Admin"} <ShieldSecurity />
                                        </button>
                                    </td>
                                    <td className="d-table-cell align-middle">
                                        <button onClick={() => { }} className="text-decoration-none btn btn-sm border_none btn-danger">
                                            Disable <Lock />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}

import styles from '@/components/dashboard/Dashboard.module.css'
import { query, where, getDocs, collection, orderBy, limit } from "firebase/firestore";
import { useState } from "react";
import { Edit2, SearchNormal, Trash } from 'iconsax-react'
import { db } from '@/firebase/fire_config';
import toCurrency from '@/components/utils/toCurrency'
import Link from 'next/link';

export default function ProductSearch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const onSearch = async (e) => {
        setSearchTerm(e.target.value)

        if (searchTerm.length > 0) {
            const q = query(
                collection(db, "products"),
                where("name_query", ">=", searchTerm.toLowerCase()),
                where("name_query", "<=", searchTerm.toLowerCase() + "\uf8ff"),
                orderBy("name_query"),
                limit(10)
            );

            const querySnapshot = await getDocs(q);
            const results = [];

            querySnapshot.forEach((doc) => {
                results.push({
                    id: doc.id,
                    ...doc.data(),
                    addedOn: doc.data().addedOn.toDate().toLocaleTimeString()
                });
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
                    className={`form-control me-2 ${styles.input_search}`}
                    type="search"
                    placeholder="Search Product By Name"
                    aria-label="Search Product By Name"
                    value={searchTerm}
                    onChange={onSearch}
                />

                <button
                    className={`btn btn-lg btn-success ${styles.btn_nav} px-3 py-2`}
                    type="button"
                    onClick={onSearch}
                >
                    <span className="d-flex">
                        <span className={styles.show_search_text}>SEARCH</span>
                        <SearchNormal size="24" className="mx-2" />
                    </span>
                </button>
            </div>

            {searchResults.length > 0 && searchTerm.length > 0 &&
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
                            {searchResults.length > 0 && searchResults.map((result) => (
                                <tr key={result.id}>
                                    <th scope="row">
                                        <img
                                            src={result.image}
                                            alt={result.name}
                                            width={50}
                                            height={50}
                                            style={{ objectFit: "cover" }}
                                            className="rounded border"
                                            crossOrigin="anonymous"
                                        />
                                    </th>
                                    <td className="d-table-cell align-middle">{result.name}</td>
                                    <td className="d-table-cell align-middle">{toCurrency(result.price)}</td>
                                    <td className="d-table-cell align-middle">{result.isHealth ? "Nutrition" : "Food"}</td>
                                    <td className="d-table-cell align-middle">
                                        <Link href={`/dashboard/product_update/${result.id}`} className="text-decoration-none btn btn-sm border_none btn-warning">
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
        </>
    )
}

import styles from "@/components/search/Search.module.css";
import {
  query,
  where,
  getDocs,
  collection,
  orderBy,
  limit,
} from "firebase/firestore";
import { useState } from "react";
import { SearchNormal } from "iconsax-react";
import { db } from "@/firebase/fire_config";
import toCurrency from "@/components/utils/toCurrency";
import Link from "next/link";

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onSearch = async () => {
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
          addedOn: doc.data().addedOn.toDate().toLocaleDateString(),
        });
      });

      setSearchResults(results);
    } else setSearchResults([]);
  };

  return (
    <>
      <div className={`${styles.search_form} me-auto mb-2 mb-md-0`}>
        <input
          className={`form-control me-2 ${styles.input_search}`}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && onSearch}
        />

        <button
          className={`btn btn-lg ${styles.btn_nav}`}
          type="button"
          onClick={onSearch}
        >
          <span className="d-flex">
            <span className={styles.show_search_text}>Search</span>
            <SearchNormal className="ms-1" />
          </span>
        </button>

        {searchResults.length > 0 && searchTerm.length > 0 && (
          <ul
            className={`list-unstyled card shadow-sm p-2 ${styles.search_result}`}
          >
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="d-flex my-2 p-2 card rounded-0 position-relative"
              >
                <Link
                  href={`/product/${result.id}`}
                  className="d-flex text-decoration-none"
                >
                  <img
                    src={result.image}
                    alt={result.name}
                    className="rounded border"
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="w-75 mx-2 d-flex flex-column justify-content-between">
                    <span className="secondary">{result.name}</span>
                    <span className="text-muted">
                      {toCurrency(result.price)}
                    </span>
                    <span className="text-muted">On: {result.addedOn}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {searchResults.length == 0 && searchTerm.length > 0 && (
          <div
            className={`list-unstyled card rounded-0 shadow-sm p-2 fw-normal text-center text-muted ${styles.search_result}`}
          >
            <h1>No result</h1>
            <i>Click search button when done typing.</i>
          </div>
        )}
      </div>
    </>
  );
}

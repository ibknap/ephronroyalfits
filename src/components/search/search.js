import {
  query,
  where,
  getDocs,
  collection,
  orderBy,
  limit,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "@/firebase/fire_config";
import toCurrency from "@/components/utils/toCurrency";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import { Trash } from "iconsax-react";
import { formatTimestamp } from "../utils/format_timestamp";
import { truncate } from "../utils/truncate";

export default function SearchBox({ show, onHide }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const q = query(
        collection(db, "products"),
        where("name_query", ">=", value.toLowerCase()),
        where("name_query", "<=", value.toLowerCase() + "\uf8ff"),
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
      <Modal
        scrollable
        show={show}
        onHide={onHide}
        contentClassName="rounded-0 border-0"
      >
        <Modal.Body className="p-0">
          <div className="container-fluid">
            <div className="row p-0">
              <div className="col-12">
                <input
                  className={`form-control rounded-0 border-0 ${
                    searchTerm.length > 0 && "border-bottom"
                  } py-3`}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={onSearch}
                  onPaste={onSearch}
                />

                {searchResults.length > 0 && searchTerm.length > 0 && (
                  <ul className="list-unstyled mt-3">
                    {searchResults.map((result) => (
                      <li
                        key={result.id}
                        className="d-flex mb-2 rounded-0 position-relative"
                      >
                        <Link
                          href={`/product/${result.id}`}
                          className="d-flex text-decoration-none"
                        >
                          <img
                            src={result.image}
                            alt={result.name}
                            width={100}
                            height={100}
                            style={{ objectFit: "cover" }}
                          />
                          <div className="w-75 mx-2 d-flex flex-column justify-content-between">
                            <span className="text-dark">
                              {truncate(result.name, 30)}
                            </span>
                            <span className="text-dark fw-bold">
                              {toCurrency(result.price)}
                            </span>
                            <small className="text-muted">
                              On: {formatTimestamp(result.addedOn)}
                            </small>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {searchResults.length === 0 && searchTerm.length > 0 && (
                  <div className="mt-3 text-center text-muted">
                    <Trash size={50} className=" mb-3 primary" />
                    <p>No Result</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

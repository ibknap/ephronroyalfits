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
        centered
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
                  <ul className="list-unstyled card">
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
                            <span className="text-muted">
                              On: {result.addedOn}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {searchResults.length === 0 && searchTerm.length > 0 && (
                  <div className="mt-3 text-center text-muted">
                    <Trash size={100} />
                    <h5>No result</h5>
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

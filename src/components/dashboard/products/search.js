import styles from "@/components/dashboard/Dashboard.module.css";
import {
  query,
  where,
  getDocs,
  collection,
  orderBy,
  limit,
} from "firebase/firestore";
import { useState } from "react";
import { Edit2, Trash } from "iconsax-react";
import { db } from "@/firebase/fire_config";
import toCurrency from "@/components/utils/toCurrency";
import Link from "next/link";
import UpdateSearchProduct from "@/components/dashboard/products/update_search";
import Loader from "@/components/loader/loader";
import { truncate } from "@/components/utils/truncate";

export default function ProductSearch() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
          ...doc.data(),
          addedOn: doc.data().addedOn.toDate().toLocaleDateString(),
        });
      });

      setSearchResults(results);
    } else setSearchResults([]);
  };

  const onDeleteProduct = async (id) => {
    setLoading(true);

    const docRef = doc(collection(db, "products"), id);

    await deleteDoc(docRef)
      .then(() => {
        toast.success(`Deleted Product With ID ${id}`);
        setLoading(false);
      })
      .catch((error) => {
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
    <>
      <div className={`${styles.search_form} me-auto mb-md-0`}>
        <input
          className={`form-control ${styles.input_search}`}
          type="search"
          placeholder="search product by name"
          aria-label="search product by name"
          value={searchTerm}
          onChange={onSearch}
        />
      </div>

      {searchResults.length > 0 && searchTerm.length > 0 && (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length > 0 &&
                searchResults.map((result) => (
                  <tr key={result.id}>
                    <th scope="row">
                      <img
                        src={result.image}
                        alt={result.name}
                        width={50}
                        height={50}
                        style={{ objectFit: "cover" }}
                      />
                    </th>
                    <td className="d-table-cell align-middle">
                      <Link
                        href={`/product/${result.id}`}
                        target="_blank"
                        className="text-decoration-none text-dark"
                      >
                        {truncate(result.name, 30)}
                      </Link>
                    </td>
                    <td className="d-table-cell align-middle">
                      {toCurrency(result.price)}
                    </td>
                    <td className="d-table-cell align-middle">
                      {result.category}
                    </td>
                    <td className="d-table-cell align-middle">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#updateSearchProduct"
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedProduct(result);
                        }}
                        className="btn btn-sm border-0 rounded-0 btn-warning"
                      >
                        Edit <Edit2 />
                      </button>
                    </td>
                    <td className="d-table-cell align-middle">
                      <button
                        onClick={() => onDeleteProduct(result.id)}
                        className="btn btn-sm border-0 rounded-0 btn-danger"
                      >
                        {loading ? (
                          <Loader />
                        ) : (
                          <>
                            {"Delete"} <Trash />
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProduct && <UpdateSearchProduct product={selectedProduct} />}
    </>
  );
}

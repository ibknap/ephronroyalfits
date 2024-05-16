import styles from "@/components/dashboard/Dashboard.module.css";
import { useState } from "react";
import { Eye, Lock, ShieldSecurity, Unlock, UserOctagon } from "iconsax-react";
import { db } from "@/firebase/fire_config";
import {
  where,
  getDocs,
  collection,
  limit,
  query,
  orderBy,
} from "firebase/firestore";
import { toast } from "react-toastify";
import ViewSearchUser from "@/components/dashboard/users/view_search";
import { truncate } from "@/components/utils/truncate";

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const onSearch = async (e) => {
    setSearchTerm(e.target.value);

    if (searchTerm.length > 0) {
      const q = query(
        collection(db, "users"),
        where("firstName", ">=", searchTerm.toLowerCase()),
        where("firstName", "<=", searchTerm.toLowerCase() + "\uf8ff"),
        orderBy("firstName"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const results = [];

      querySnapshot.forEach((doc) => results.push(doc.data()));

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const onUserAccessibility = async () => {
    toast.info("You can't change user accessibility via search");
  };

  const onUserVisibility = async () => {
    toast.info("You can't change user visibility via search");
  };

  return (
    <>
      <div className={`${styles.search_form} me-auto mb-md-0`}>
        <input
          className={`form-control ${styles.input_search}`}
          type="search"
          placeholder="search user by first name"
          aria-label="search user by first name"
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
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">View</th>
                <th scope="col">Accessibility</th>
                <th scope="col">Visibility</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length > 0 &&
                searchResults.map((result) => (
                  <tr key={result.id}>
                    <th scope="row">
                      <UserOctagon variant="Bulk" size={50} />
                    </th>
                    <td className="d-table-cell align-middle">
                      {truncate(result.firstName, 25)}
                    </td>
                    <td className="d-table-cell align-middle">
                      {result.email}
                    </td>
                    <td className="d-table-cell align-middle">
                      {result.gender.toUpperCase()}
                    </td>
                    <td className="d-table-cell align-middle">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#viewSearchUser"
                        onClick={() => setSelectedUser(result)}
                        className="btn btn-sm border-0 rounded-0 btn-warning"
                      >
                        View <Eye />
                      </button>
                    </td>
                    <td className="d-table-cell align-middle">
                      <button
                        onClick={() => onUserAccessibility()}
                        className="btn btn-sm border-0 rounded-0 btn-dark"
                      >
                        Change <ShieldSecurity />
                      </button>
                    </td>
                    <td className="d-table-cell align-middle">
                      <button
                        onClick={() => onUserVisibility()}
                        className="btn btn-sm border-0 rounded-0 btn-dark"
                      >
                        Change <Lock />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <ViewSearchUser user={selectedUser} />
    </>
  );
}

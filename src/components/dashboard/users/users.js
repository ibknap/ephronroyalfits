import { Eye, Lock, ShieldSecurity, Unlock, UserOctagon } from "iconsax-react";
import { db } from "@/firebase/fire_config";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import UserSearch from "@/components/dashboard/users/search";
import { toast } from "react-toastify";
import ViewUser from "@/components/dashboard/users/view";
import CreateUser from "@/components/dashboard/users/create";
import exportUsersAsCSV from "@/components/dashboard/users/export";
import { truncate } from "@/components/utils/truncate";

export default function DashboardUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // listening to users
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("joinedOn", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setUsers(data);
    });

    return () => unsubscribe();
  }, []);

  const onUserAccessibility = async (id, isAdmin) => {
    const docRef = doc(collection(db, "users"), id);

    await updateDoc(docRef, {
      isAdmin: !isAdmin,
    })
      .then(() => {
        toast.success(isAdmin ? "Downgraded To User " : "Upgraded To Admin");
      })
      .catch((error) => {
        if (error.code == "not-found") {
          toast.error("User not found");
        } else {
          toast.error(`Something is wrong: ${error.message}`);
        }
      });
  };

  const onUserVisibility = async (id, isActive) => {
    const docRef = doc(collection(db, "users"), id);

    await updateDoc(docRef, {
      isActive: !isActive,
    })
      .then(() => {
        toast.success(isActive ? "User Disabled" : "User Enabled");
      })
      .catch((error) => {
        if (error.code == "not-found") {
          toast.error("User not found");
        } else {
          toast.error(`Something is wrong: ${error.message}`);
        }
      });
  };

  return (
    <div className="dashboard_content">
      <div className="container mb-5">
        <div className="row">
          <div className="col-12">
            <div className="mb-2 p-2 border-0 rounded-0 card shadow-sm">
              <div className="row justify-content-between">
                <div className="col-sm-6 text-start">
                  <h4>Users</h4>
                  <small className="text-muted">
                    Create, update, export and view users
                  </small>
                </div>

                <div className="col-sm-6 text-end">
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#createUser"
                    className="btn btn-warning border-0 rounded-0"
                  >
                    Create User
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12">
            <div className="mb-2 p-2 border-0 rounded-0 card shadow-sm">
              <UserSearch />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="p-2 border-0 rounded-0 card shadow-sm">
              <div>
                All Users
                <hr />
              </div>

              {users && (
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
                      {users.length > 0 &&
                        users.map((user, index) => (
                          <tr key={index}>
                            <th scope="row">
                              <UserOctagon variant="Bulk" size={50} />
                            </th>
                            <td className="d-table-cell align-middle">
                              {truncate(user.firstName, 25)}
                            </td>
                            <td className="d-table-cell align-middle">
                              {user.email}
                            </td>
                            <td className="d-table-cell align-middle">
                              {user.gender.toUpperCase()}
                            </td>
                            <td className="d-table-cell align-middle">
                              <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#viewUser"
                                onClick={() => setSelectedUser(user)}
                                className="btn btn-sm border-0 rounded-0 btn-warning"
                              >
                                View <Eye />
                              </button>
                            </td>
                            <td className="d-table-cell align-middle">
                              <button
                                onClick={() => {
                                  onUserAccessibility(user.id, user.isAdmin);
                                }}
                                className={`btn btn-sm border-0 rounded-0 ${
                                  user.isAdmin ? "btn-info" : "btn-dark"
                                }`}
                              >
                                {user.isAdmin ? "Make User" : "Make Admin"}{" "}
                                <ShieldSecurity />
                              </button>
                            </td>
                            <td className="d-table-cell align-middle">
                              <button
                                onClick={() => {
                                  onUserVisibility(user.id, user.isActive);
                                }}
                                className={`btn btn-sm border-0 rounded-0 ${
                                  user.isActive ? "btn-danger" : "btn-success"
                                }`}
                              >
                                {user.isActive ? (
                                  <>
                                    {"Disable"} <Lock />
                                  </>
                                ) : (
                                  <>
                                    {"Enable"} <Unlock />
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
            </div>
          </div>
        </div>
      </div>

      <CreateUser />
      <ViewUser user={selectedUser} />
    </div>
  );
}

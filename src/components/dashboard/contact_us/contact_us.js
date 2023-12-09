import { db } from "@/firebase/fire_config";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, limit } from "firebase/firestore";
import { DirectInbox, DirectSend, Eye } from "iconsax-react";
import Link from "next/link";
import ViewContactMessage from "@/components/dashboard/contact_us/view";
import { truncate } from "@/components/utils/truncate";

export default function ContactUs() {
  const [contactUs, setContactUs] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // listening to contact us
  useEffect(() => {
    const q = query(collection(db, "contactUs"), limit(10));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setContactUs(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard_content">
      <div className="container mb-5">
        <div className="row">
          <div className="col-12">
            <div className="mb-2 p-2 border-0 rounded-0 card shadow-sm">
              <div className="row justify-content-between">
                <div className="col-sm-6 text-start">
                  <h4>Contact us</h4>
                  <small className="text-muted">view and reply messages</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-2">
          <div className="col-md-10">
            <div className="p-2 border-0 rounded-0 card shadow-sm">
              <div>
                All Messages
                <hr />
              </div>

              {contactUs && (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">View</th>
                        <th scope="col">Reply</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactUs.length > 0 &&
                        contactUs.map((contact) => (
                          <tr key={contact.id}>
                            <th scope="row">
                              <DirectInbox variant="Bulk" size={50} />
                            </th>
                            <td className="d-table-cell align-middle">
                              {truncate(contact.fullName, 25)}
                            </td>
                            <td className="d-table-cell align-middle">
                              {contact.email}
                            </td>
                            <td className="d-table-cell align-middle">
                              <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#viewContactMessage"
                                onClick={() => {
                                  setSelectedMessage(contact.message);
                                }}
                                className="btn btn-sm btn-warning border-0 rounded-0"
                              >
                                View <Eye />
                              </button>
                            </td>
                            <td className="d-table-cell align-middle">
                              <Link
                                href={`mailto:${contact.email}`}
                                target="_blank"
                                className="btn btn-sm btn-info border-0 rounded-0"
                              >
                                Reply <DirectSend />
                              </Link>
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

      <ViewContactMessage message={selectedMessage} />
    </div>
  );
}

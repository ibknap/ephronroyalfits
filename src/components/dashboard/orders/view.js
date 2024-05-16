import { formatTimestamp } from "@/components/utils/format_timestamp";
import toCurrency from "@/components/utils/toCurrency";
import { Gift } from "iconsax-react";
import Link from "next/link";

export default function ViewCartDonation({ order }) {
  if (!order) {
    return (
      <div
        className="modal fade"
        id="viewCartDonation"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="modal fade"
      id="viewCartDonation"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-body">
            <div className="row">
              <div className="col-12">
                <h6>Cart Orders</h6>
                <hr />
              </div>

              <div className="col-12">
                {order.items.length > 0 ? (
                  <ul className="list-unstyled ">
                    {order.items.map((order) => (
                      <li
                        key={order.id}
                        className="d-flex mb-3 flex-row position-relative"
                      >
                        <Link
                          href={`/product/${order.id}`}
                          target="_blank"
                          className="d-flex text-decoration-none"
                        >
                          <img
                            src={order.image}
                            alt={order.name}
                            className="rounded border"
                            width={100}
                            height={100}
                            style={{ objectFit: "cover" }}
                          />
                          <div className="w-75 ms-2 d-flex flex-column justify-content-between">
                            <span className="text-dark">{order.name}</span>
                            <span className="text-muted">ID: {order.id}</span>
                            <small className="text-muted">
                              Price: <b>{toCurrency(order.price)}</b>
                            </small>
                            <span className="text-muted">
                              On: {formatTimestamp(order.addedOn)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center text-muted">
                    <Gift size={100} variant="Bulk" />
                    <h5>No order made yet.</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

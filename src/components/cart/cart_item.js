import { Add, Minus, Trash } from "iconsax-react";
import { useCart } from "@/components/cart/cart_context";
import toCurrency from "@/components/utils/toCurrency";
import Link from "next/link";
import { truncate } from "../utils/truncate";

export default function CartItem({ item }) {
  const { items, removeItem, updateQuantity } = useCart();

  const increaseQuantity = (id) => {
    const item = items.find((item) => item.id === id);
    updateQuantity(id, item.cartQuantity + 1);
  };

  const decreaseQuantity = (id) => {
    const item = items.find((item) => item.id === id);
    if (item.cartQuantity > 1) updateQuantity(id, item.cartQuantity - 1);
    else removeItem(id);
  };

  return (
    <div className="col-12">
      <ul className="list-unstyled">
        <li className="my-2 p-2 card rounded-0">
          <Link
            href={`/product/${item.id}`}
            className="text-decoration-none text-dark"
          >
            <div className="d-flex position-relative">
              <img
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
              />
              <div className="d-flex flex-column w-75 px-2">
                {truncate(item.name, 30)}
                <b>{toCurrency(item.price)}</b>
                <span>
                  Qty: <b>{item.cartQuantity}</b>
                </span>
              </div>
            </div>
          </Link>

          <div className="d-flex mt-2 justify-content-between">
            <button
              className="btn btn-sm btn-outline-danger rounded-0 border-0 p-0"
              onClick={() => removeItem(item.id)}
            >
              <Trash />
              Remove
            </button>
            <div className="d-flex">
              <button
                className="btn btn-sm btn-dark rounded-0 border-0 shadow-sm me-2"
                onClick={() => decreaseQuantity(item.id)}
              >
                <Minus />
              </button>
              <button
                className="btn btn-sm btn-dark rounded-0 border-0 shadow-sm"
                onClick={() => increaseQuantity(item.id)}
              >
                <Add />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

import styles from "@/components/cart/Cart.module.css";
import { ShoppingCart } from "iconsax-react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart_context";
import CartItem from "@/components/cart/cart_item";
import toCurrency from "@/components/utils/toCurrency";
import { useAuth } from "@/firebase/fire_auth_context";
import { toast } from "react-toastify";
import { doc, collection, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase/fire_config";

export default function Cart() {
  const { items, clearCart } = useCart();
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.cartQuantity,
    0
  );
  const { authUser } = useAuth();

  const makeOrder = () => {
    if (authUser) {
      let handler = PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY,
        // key: process.env.NEXT_PUBLIC_PAYSTACK_LIVE_PUBLIC_KEY,
        email: authUser.email,
        amount: totalPrice * 100,
        ref: `${Math.floor(Math.random() * 1000000000 + 1)}`,
        label: "Ephron Order",
        onClose: () => onCreateOrder(false),
        callback: (res) => onCreateOrder(true, res.reference),
      });

      handler.openIframe();
    } else toast.error("Sign in to place order.");
  };

  const onCreateOrder = async (isCompleted, ref) => {
    const docRef = doc(collection(db, "orders"));

    const orderDoc = {
      id: ref,
      image: "https://ephronroyalfits.com/logo/png/logo_trans.png",
      name: "Cart Purchase",
      email: authUser.email,
      amount: totalPrice,
      isCompleted: isCompleted ? true : false,
      status: isCompleted ? "delivered" : "cancelled",
      items: items,
      addedOn: serverTimestamp(),
    };

    await setDoc(docRef, orderDoc)
      .then(async () => {
        toast.success("Order Placed!");
        clearCart();
      })
      .catch((e) => toast.error(`Something is wrong: ${e.message}`));
  };

  return (
    <div style={{ marginTop: "6rem" }}>
      {items.length == 0 && (
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-sm-10 text-center">
              <ShoppingCart variant="Bulk" size="200" />

              <div className="my-4">
                <h4>Your cart is empty!</h4>
                <p className="text-muted m-0">
                  Browse and start ordering with a click.
                </p>
              </div>

              <Link
                href="/"
                className="my-4 btn btn-lg btn-dark border-0 rounded-0"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="container my-5">
          <div className="row">
            <div className="col-sm-8">
              <div className={styles.card_header}>Shopping Cart</div>
              <div className="row mt-2">
                {items.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </div>
            </div>

            <div className="col-md-4">
              <div className="m-2 p-2 shadow-sm">
                <div className={styles.card_header}>Summary</div>
                <div className="d-flex flex-column py-3 border-bottom justify-content-between">
                  <div className="d-flex justify-content-between">
                    <b>Total</b>
                    <b>{toCurrency(totalPrice)}</b>
                  </div>
                </div>

                <button
                  onClick={() => makeOrder()}
                  className="btn btn-lg btn-dark border-0 rounded-0 w-100 mt-4"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

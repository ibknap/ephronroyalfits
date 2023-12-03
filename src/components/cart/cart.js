import styles from "@/components/cart/Cart.module.css";
import { Heart, ShoppingCart } from "iconsax-react";
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
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const { authUser } = useAuth();

  const makeDonation = (event) => {
    event.preventDefault();

    if (authUser) {
      let handler = PaystackPop.setup({
        // key: process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY,
        key: process.env.NEXT_PUBLIC_PAYSTACK_LIVE_PUBLIC_KEY,
        email: authUser.email,
        amount: totalPrice * 100,
        ref: `${Math.floor(Math.random() * 1000000000 + 1)}`,
        label: "Ephron Donation",
        onClose: () => {
          onCreateDonation(false);
        },
        callback: (res) => {
          onCreateDonation(true, res.reference);
        },
      });

      handler.openIframe();
    } else {
      toast.error("Sign in to make donations.");
    }
  };

  const onCreateDonation = async (isCompleted, ref) => {
    const docRef = doc(collection(db, "donations"));

    const donationDoc = {
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

    await setDoc(docRef, donationDoc)
      .then(async () => {
        toast.success("Donation Completed!");
        clearCart();
      })
      .catch((error) => {
        toast.error(`Something is wrong: ${error.message}`);
      });
  };

  return (
    <>
      {items.length == 0 && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-10">
              <div className="shadow my-5 mx-2 p-2 text-center rounded">
                <ShoppingCart className="primary" size="200" />
                <h4>Your cart is empty!</h4>
                <p className="text-muted">Browse and start donating!</p>
                <Link
                  href="/"
                  className="my-4 btn btn-lg bg_primary white shadow border_none"
                >
                  Start Donating
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <div className="m-2 shadow-sm p-3 rounded">
                <div className={styles.card_header}>Shopping Cart</div>
                <div className="row mt-2">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="m-2 p-2 shadow-sm rounded">
                <div className={styles.card_header}>Summary</div>
                <div className="d-flex flex-column py-3 border-bottom justify-content-between">
                  <div className="d-flex justify-content-between">
                    <b>Total</b>
                    <b>{toCurrency(totalPrice)}</b>
                  </div>
                  <small className="text-muted">
                    Delivery fees not included
                  </small>
                </div>

                <form onSubmit={makeDonation}>
                  <button
                    type="submit"
                    className={`w-100 my-3 btn btn-lg btn-success ${styles.btn_nav}`}
                  >
                    <Heart variant="Bold" />
                    Donate
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

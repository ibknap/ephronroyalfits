import { useCart } from "@/components/cart/cart_context";
import { useState, useEffect } from "react";
import toCurrency from "@/components/utils/toCurrency";
import { Add, Minus, ShoppingCart } from "iconsax-react";
import Loader from "@/components/loader/loader";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/fire_config";
import { toast } from "react-toastify";

export default function Product({ id }) {
  const { items, removeItem, isInCart, addItem, getItem, updateQuantity } =
    useCart();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (id) {
      const docRef = doc(db, "products", id);

      const unsubscribe = onSnapshot(docRef, (snap) => {
        if (snap.exists()) setProduct(snap.data());
        else toast.error("Product not found");
      });

      return () => unsubscribe();
    }
  }, [id]);

  if (!product) return <Loader fullHeight={true} />;

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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="mb-2 rounded-0 card shadow">
            <div className="row d-flex">
              <div className="col-12">
                <img
                  src={product?.image}
                  alt={product.name}
                  width="100%"
                  className="rounded-0"
                  style={{ objectFit: "cover", minHeight: 350 }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="mb-2 px-2">
            <h5 className="fw-normal">{product.name}</h5>
            <small className="fw-bold">id: {product.id}</small>

            <h4 className="primary mt-3">{toCurrency(product.price)}</h4>
            <p className="fw-bold">Adet: {product.quantity}</p>
            <p>Barkod: {product.barcode}</p>

            <div className="d-flex flex-column py-3 border-bottom justify-content-between">
              {product.variation && (
                <div className="mb-3">
                  <b>Varyasyonlar</b>
                  {product.variation.map((variation) => (
                    <button
                      key={variation.id} // Add a unique key to each button
                      onClick={() => setSelectedVariant(variation)}
                      className={`d-flex justify-content-between btn btn-sm ${
                        selectedVariant === variation
                          ? "btn-dark"
                          : "btn-outline-dark"
                      } my-2 w-100`}
                    >
                      {variation.name}
                      <span>{variation.value}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="d-flex justify-content-between">
                <b>Toplam</b>
                <b>{toCurrency(product.price)}</b>
              </div>
            </div>

            {isInCart(product.id) ? (
              <div className="d-flex my-3">
                <button
                  className="border_none mx-2 bg_black rounded-0 white shadow-sm"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  <Minus />
                </button>
                <p className="centered-text">{getItem(product).cartQuantity}</p>
                <button
                  className="border_none mx-2 bg_black rounded-0 white shadow-sm"
                  onClick={() => increaseQuantity(product.id)}
                >
                  <Add />
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  addItem({
                    ...product,
                    variantName: selectedVariant.name,
                    variantValue: selectedVariant.value,
                  })
                }
                disabled={product.quantity === 0 || product.quantity === "0"}
                className="w-100 my-3 btn btn-lg btn-outline-success rounded-0 outline-primary btn_nav"
              >
                <ShoppingCart variant="Bulk" />
                Sepete Ekle
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

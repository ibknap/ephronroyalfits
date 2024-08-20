import { useCart } from "@/components/cart/cart_context";
import { useState, useEffect } from "react";
import toCurrency from "@/components/utils/toCurrency";
import { Add, HeartAdd, Minus, ShoppingCart, Trash } from "iconsax-react";
import Loader from "@/components/loader/loader";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/fire_config";
import { toast } from "react-toastify";
import { useSaved } from "@/components/account/saved/saved_context";
import Link from "next/link";

export default function Product({ id }) {
  const { items, removeItem, isInCart, addItem, getItem, updateQuantity } =
    useCart();
  const { addSavedItem, removeSavedItem, isInSaved } = useSaved();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

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
    <>
      <div className="bottom_spacer" />

      <div className="container-fluid mt-2 mb-5">
        <div className="row">
          <div className="col-md-8">
            <div className="row mb-3">
              <div className="col-2 text-center pe-0">
                <ul className="list-unstyled p-0 m-0">
                  {[product.image, ...product.otherImages].map((img, index) => (
                    <li
                      key={index}
                      onClick={() => setSelectedImg(img)}
                      className="mb-3 pe-active"
                    >
                      <img
                        src={img}
                        alt={index}
                        className="product-detail-other-img"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-10 position-relative">
                <img
                  src={selectedImg != null ? selectedImg : product.image}
                  alt={product.name}
                  className="product-detail-img"
                />

                <HeartAdd
                  onClick={() =>
                    isInSaved(product.id)
                      ? removeSavedItem(product.id)
                      : addSavedItem(product)
                  }
                  variant={isInSaved(product.id) ? "Bold" : "Bulk"}
                  size={32}
                  className="product-saved pe-active me-3"
                  style={{
                    color: isInSaved(product.id) ? "#57aecf" : "red",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="mb-2 px-2">
              <h5 className="fw-normal fw-bold">{product.name}</h5>
              <small className="fw-bold">id: {product.id}</small>

              <h4 className="primary mt-4 fw-bold">
                {toCurrency(product.price)}
              </h4>

              <img src="/images/nn.png" alt="nn" width="100%"/>

              <p className="mt-4">
                <b>Quantity:</b> {product.quantity}
              </p>

              <p className="mt-4">
                <b>Category: </b>
                <Link
                  className="primary"
                  href={`/category/${product.category}/${
                    product.sub_category === false ||
                    product.sub_category.length <= 0
                      ? ""
                      : product.sub_category
                  }`
                    .replace(/\s/g, "")
                    .toLowerCase()}
                >
                  {`${product.category}/${
                    product.sub_category === false ||
                    product.sub_category.length <= 0
                      ? ""
                      : product.sub_category
                  }`
                    .replace(/\s/g, "")
                    .toLowerCase()}
                </Link>
              </p>

              <p className="mt-4">
                <b>Gender:</b> {product.gender}
              </p>

              {product.specifications && product.specifications.length > 0 && (
                <ul className="list-unstyled my-4">
                  {product.specifications.map((spec, index) => (
                    <li key={index}>
                      <strong>{spec.name}: </strong>
                      {spec.value}
                    </li>
                  ))}
                </ul>
              )}

              <p>{product.description}</p>

              {isInCart(product.id) ? (
                <div className="col-5 d-flex my-4 justify-content-between align-items-center">
                  <button
                    className="btn btn-primary rounded-0 border-0"
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    <Minus />
                  </button>

                  {getItem(product).cartQuantity}

                  <button
                    className="btn btn-primary rounded-0 border-0"
                    onClick={() => increaseQuantity(product.id)}
                  >
                    <Add />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addItem(product)}
                  disabled={parseInt(product.quantity) === 0}
                  className="btn btn-lg btn-primary border-0 rounded-0 w-100"
                >
                  <ShoppingCart variant="Bulk" className="me-2" />
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

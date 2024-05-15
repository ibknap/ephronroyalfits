import { useCart } from "@/components/cart/cart_context";
import { useState, useEffect } from "react";
import toCurrency from "@/components/utils/toCurrency";
import { Add, HeartAdd, Minus, ShoppingCart, Trash } from "iconsax-react";
import Loader from "@/components/loader/loader";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase/fire_config";
import { toast } from "react-toastify";
import { useSaved } from "@/components/account/saved/saved_context";
import Link from "next/link";
import { truncate } from "@/components/utils/truncate";
import shuffleArray from "@/components/utils/shuffle_array";

export default function Product({ id }) {
  const { items, removeItem, isInCart, addItem, getItem, updateQuantity } =
    useCart();
  const { addSavedItem, removeSavedItem, isInSaved } = useSaved();
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("addedOn"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      const shuffledProducts = shuffleArray(data);
      setProducts(shuffledProducts);
    });

    return () => unsubscribe();
  }, []);

  const changeImg = (id, isHover) => {
    const product = products.find((p) => p.id === id);
    if (product) return isHover ? product.otherImages[0] : product.image;
    return "";
  };

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
          <div className="col-md-7">
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

          <div className="col-md-5">
            <div className="mb-2 px-2">
              <h5 className="fw-normal">{product.name}</h5>
              <small className="fw-bold">id: {product.id}</small>

              <h4 className="primary mt-4 fw-bold">
                {toCurrency(product.price)}
              </h4>

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
                <div className="d-flex mt-5 mb-3 justify-content-between align-items-center">
                  <button
                    className="btn btn-dark rounded-0"
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    <Minus />
                  </button>
                  {getItem(product).cartQuantity}
                  <button
                    className="btn btn-dark rounded-0"
                    onClick={() => increaseQuantity(product.id)}
                  >
                    <Add />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addItem(product)}
                  disabled={parseInt(product.quantity) === 0}
                  className="w-100 mt-5 mb-3 btn btn-lg btn-outline-success rounded-0 outline-primary btn_nav"
                >
                  <ShoppingCart variant="Outline" className="me-2" />
                  Add to cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row mb-3">
          <div className="col-12">
            <h5 className="fw-bold">Check out</h5>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="row">
            {products.map((product, index) => (
              <div
                key={index}
                className="col-md-3"
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                <div className="product-card shadow-sm mb-3">
                  <img
                    src={changeImg(product.id, product.id === hoveredProductId)}
                    alt={product.name}
                    className="product-img"
                  />

                  <div className="product-body">
                    <Link
                      href={`/product/${product.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <h1>{truncate(product.name, 35)}</h1>
                    </Link>

                    <div className="product-add-to-cart">
                      <div className="d-flex justify-content-between align-items-center">
                        <b>{toCurrency(product.price)}</b>
                        <button
                          onClick={() =>
                            isInCart(product.id)
                              ? removeItem(product.id)
                              : addItem(product)
                          }
                          className="btn btn-primary border-0 rounded-0"
                        >
                          {isInCart(product.id) ? "Remove" : "Add to cart"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <HeartAdd
                    onClick={() =>
                      isInSaved(product.id)
                        ? removeSavedItem(product.id)
                        : addSavedItem(product)
                    }
                    variant={isInSaved(product.id) ? "Bold" : "Bulk"}
                    size={28}
                    className="product-saved pe-active"
                    style={{
                      color: isInSaved(product.id) ? "#57aecf" : "red",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row">
            <div className="col-12 text-center">
              <Trash size={100} variant="Bulk" className="mb-3 primary" />
              <p className="m-0">No products added yet.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

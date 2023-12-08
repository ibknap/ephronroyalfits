import { HeartAdd, Trash } from "iconsax-react";
import { truncate } from "@/components/utils/truncate";
import toCurrency from "@/components/utils/toCurrency";
import Link from "next/link";
import { useSaved } from "@/components/account/saved/saved_context";
import { useCart } from "@/components/cart/cart_context";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/fire_config";

export default function Products({ length = 0, title = "", tag = "all" }) {
  const { addItem, isInCart, removeItem } = useCart();
  const { addSavedItem, isInSaved, removeSavedItem } = useSaved();
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("addedOn"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setProducts(data);
    });

    return () => unsubscribe();
  }, []);

  const changeImg = (id, isHover) => {
    const product = products.find((p) => p.id === id);
    if (product) return isHover ? product.otherImages[0] : product.image;
    return "";
  };

  return (
    <div className="container my-5">
      {title.length > 0 && (
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h3>{title}</h3>
          </div>
        </div>
      )}

      {products.length > 0 ? (
        <div className="row">
          {products.map((product, index) => (
            <div
              key={index}
              className="col-md-3"
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <div className="product-card mb-3">
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
                    <h1>{truncate(product.name.toUpperCase(), 35)}</h1>
                  </Link>

                  <div className="d-flex justify-content-between align-items-center">
                    <b>{toCurrency(product.price)}</b>
                    <button
                      onClick={() =>
                        isInCart(product.id)
                          ? removeItem(product.id)
                          : addItem(product)
                      }
                      className="btn btn-dark border-0 rounded-0"
                    >
                      {isInCart(product.id) ? "Remove" : "Add to cart"}
                    </button>
                  </div>
                </div>

                {tag !== "all" && <div className="product-tag">{tag}</div>}

                <HeartAdd
                  onClick={() =>
                    isInSaved(product.id)
                      ? removeSavedItem(product.id)
                      : addSavedItem(product)
                  }
                  variant="Bulk"
                  size={28}
                  className={`product-saved pe-active ${
                    isInSaved(product.id) ? "primary" : "text-dark"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          <div className="col-12 text-center">
            <Trash size={200} variant="Bulk" />
            <p className="m-0">No products added yet.</p>
          </div>
        </div>
      )}
    </div>
  );
}

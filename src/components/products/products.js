import { HeartAdd, Trash } from "iconsax-react";
import { truncate } from "@/components/utils/truncate";
import toCurrency from "@/components/utils/toCurrency";
import Link from "next/link";
import { useSaved } from "@/components/account/saved/saved_context";
import { useEffect, useState } from "react";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/fire_config";
import shuffleArray from "@/components/utils/shuffle_array";

export default function Products({
  className,
  length,
  title,
  tag,
  category,
  sub_category,
  random,
}) {
  const { addSavedItem, isInSaved, removeSavedItem } = useSaved();
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let q;

    if (title) {
      if (title.toLowerCase() === "women" || title.toLowerCase() === "men") {
        q = query(
          collection(db, "products"),
          where("gender", "==", title.toLowerCase()),
          orderBy("addedOn", "desc"),
          limit(length)
        );
      } else {
        if (category !== null && sub_category === null && length > 0) {
          q = query(
            collection(db, "products"),
            where("category", "==", category),
            orderBy("addedOn", "desc"),
            limit(length)
          );
        } else if (category !== null && sub_category === null) {
          q = query(
            collection(db, "products"),
            where("category", "==", category),
            orderBy("addedOn", "desc")
          );
        } else if (category !== null && sub_category !== null) {
          q = query(
            collection(db, "products"),
            where("category", "==", category),
            where("sub_category", "==", sub_category),
            orderBy("addedOn", "desc")
          );
        } else if (length > 0) {
          q = query(
            collection(db, "products"),
            orderBy("addedOn", "desc"),
            limit(length)
          );
        } else {
          q = query(collection(db, "products"), orderBy("addedOn"));
        }
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        if (random) setProducts(shuffleArray(data));
        else setProducts(data);
      });

      return () => unsubscribe();
    }
  }, [length, title, tag, category, sub_category]);

  // useEffect(() => {
  //   let q;
  //   if (category && length > 0) {
  //     q = query(
  //       collection(db, "products"),
  //       where("category", "==", category),
  //       orderBy("addedOn"),
  //       limit(length)
  //     );
  //   } else if (category) {
  //     q = query(
  //       collection(db, "products"),
  //       where("category", "==", category),
  //       orderBy("addedOn")
  //     );
  //   } else if (category && sub_category) {
  //     q = query(
  //       collection(db, "products"),
  //       where("category", "==", category),
  //       where("sub_category", "==", sub_category),
  //       orderBy("addedOn")
  //     );
  //   } else if (length > 0) {
  //     q = query(collection(db, "products"), orderBy("addedOn"), limit(length));
  //   } else {
  //     q = query(collection(db, "products"), orderBy("addedOn"));
  //   }

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const data = snapshot.docs.map((doc) => doc.data());
  //     if (random) setProducts(shuffleArray(data));
  //     else setProducts(data);
  //   });

  //   return () => unsubscribe();
  // }, [length, title, tag, category]);

  const changeImg = (id, isHover) => {
    const product = products.find((p) => p.id === id);
    if (product) return isHover ? product.otherImages[0] : product.image;
    return "";
  };

  return (
    <div className={`container ${className}`}>
      {title && (
        <div className="row mb-4">
          <div className="col-12">
            <h5 className="fw-bold">{title}</h5>
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
                    <small className="text-muted">{product.category}</small>

                    <h1 className="fw-bold">{truncate(product.name, 30)}</h1>

                    <div>{toCurrency(product.price)}</div>

                    <small className="text-muted">Available In: XL L S</small>
                  </Link>
                </div>

                {tag && <div className="product-tag">{tag}</div>}

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
  );
}

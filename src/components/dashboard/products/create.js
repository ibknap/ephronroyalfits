import { useRef, useState } from "react";
import { db } from "@/firebase/fire_config";
import { toast } from "react-toastify";
import Loader from "@/components/loader/loader";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ProductSpecification from "@/components/dashboard/products/specification";
import categories from "@/components/utils/categories";
import ProductImages from "@/components/dashboard/products/images";
import { v4 } from "uuid";
const storage = getStorage();

export default function CreateProduct() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rawImages, setRawImages] = useState([{}]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(null);
  const [sub_category, setSubCategory] = useState("Select");
  const [gender, setGender] = useState("men");
  const [specifications, setSpecifications] = useState([{}]);
  const [description, setDescription] = useState("");

  const onCreateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.info("Compressing images");

    const docRef = doc(collection(db, "products"));
    const newProduct = {
      id: docRef.id,
      name: name,
      name_query: name.toLowerCase(),
      price: price,
      quantity: quantity,
      gender: gender.toLowerCase(),
      category: category.name.toLowerCase(),
      sub_category: sub_category.toLowerCase(),
      specifications: specifications,
      description: description,
      numOfOrders: 0,
      addedOn: serverTimestamp(),
    };

    const compressedImageList = await Promise.all(
      rawImages.map(async (file) => {
        const compressedImage = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const image = new Image();
            image.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = image.width;
              canvas.height = image.height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
              canvas.toBlob(resolve, "image/jpeg", 1);
            };
            image.src = reader.result;
          };
          reader.readAsDataURL(file);
        });

        const imageRef = ref(storage, `product_images/${v4()}`);
        await uploadBytes(imageRef, compressedImage);
        return getDownloadURL(imageRef);
      })
    );

    const imageRef = ref(storage, `product_images/${v4()}`);
    await uploadBytes(imageRef, selectedImage);

    await getDownloadURL(imageRef)
      .then(async (image) => {
        toast.info("adding product");

        await setDoc(docRef, {
          ...newProduct,
          image: image,
          otherImages: compressedImageList,
        })
          .then(() => {
            toast.success("Added New Product");
            resetForm();
          })
          .catch((error) => {
            toast.error(`Something is wrong: ${error.message}`);
            setLoading(false);
          });
      })
      .catch((error) => {
        toast.error(`Something is wrong: ${error.message}`);
        setLoading(false);
      });
  };

  const resetForm = () => {
    setLoading(false);
    setSelectedImage(null);
    setRawImages([{}]);
    setName("");
    setPrice("");
    setQuantity("");
    setCategory(null);
    setSubCategory("Select");
    setSpecifications([{}]);
    setDescription("");
    formRef.current?.reset();
  };

  const handleEmitedSpecification = (specs) => setSpecifications(specs);

  return (
    <div
      className="modal fade"
      id="createProduct"
      tabIndex="-1"
      aria-labelledby="createProductLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="createProductLabel">
              Create New Product
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => resetForm()}
            />
          </div>
          <form onSubmit={onCreateProduct} ref={formRef}>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <div className="form-floating">
                    <input
                      type="file"
                      className="form-control rounded-0"
                      required
                      id="main_image"
                      placeholder="Main Image"
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                    />
                    <label htmlFor="main_image">Main Image</label>
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      required
                      id="name"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">Name</label>
                  </div>
                </div>
              </div>

              <ProductImages
                rawImages={rawImages}
                setRawImages={setRawImages}
              />

              <div className="row mt-3">
                <div className="col-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      required
                      id="price"
                      placeholder="Price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <label htmlFor="price">Price</label>
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      required
                      id="quantity"
                      placeholder="Quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <label htmlFor="quantity">Quantity</label>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12">
                  <select
                    className="form-select rounded-0 py-2"
                    required
                    id="gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="men">men</option>
                    <option value="women">women</option>
                  </select>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <select
                      required
                      className="form-control rounded-0"
                      id="category"
                      placeholder="Select category"
                      onChange={(e) => {
                        const selectedCategory = categories.find(
                          (c) => c.name === e.target.value
                        );
                        setCategory(selectedCategory);
                        setSubCategory(
                          selectedCategory.sub.length > 0 &&
                            selectedCategory.sub[0].name.toLowerCase()
                        );
                      }}
                    >
                      {categories.map((category, index) => (
                        <option key={index} defaultValue={category}>
                          {category.name}
                        </option>
                      ))}
                    </select>

                    <label className="form-label" htmlFor="category">
                      Category
                    </label>
                  </div>
                </div>

                {category && category.name !== "Select" && (
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select
                        className="form-control rounded-0"
                        id="sub_category"
                        placeholder="select sub category"
                        onChange={(e) => setSubCategory(e.target.value)}
                      >
                        {category.sub.map((s, index) => (
                          <option key={index} defaultValue={s}>
                            {s.name}
                          </option>
                        ))}
                      </select>

                      <label className="form-label" htmlFor="sub_category">
                        Sub Category (optional)
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <ProductSpecification
                specifications={specifications}
                setSpecifications={setSpecifications}
                emitedSpecification={handleEmitedSpecification}
              />

              <div className="col-12 mt-3">
                <div className="form-floating">
                  <textarea
                    className="form-control rounded-0"
                    required
                    placeholder="Description"
                    id="description"
                    style={{ height: "200px" }}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  <label htmlFor="description">Description</label>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-lg btn-dark border-0 rounded-0"
              >
                {loading ? <Loader /> : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

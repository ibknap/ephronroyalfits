import { Heart, ShoppingCart } from "iconsax-react";
import toCurrency from '@/components/utils/toCurrency'
import { useCart } from '@/components/cart/cart_context';
import { useSaved } from "@/components/account/saved/saved_context";
import { useAuth } from '@/firebase/fire_auth_context';
import { toast } from "react-toastify";
import { doc, collection, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/fire_config";

export default function Product({ product }) {
    const { addItem } = useCart();
    const { addSavedItem } = useSaved();
    const { authUser } = useAuth();

    const makeDonation = event => {
        event.preventDefault();

        if (authUser) {
            let handler = PaystackPop.setup({
                key: process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY,
                email: authUser.email,
                amount: product.price * 100,
                ref: `${Math.floor((Math.random() * 1000000000) + 1)}`,
                label: "NEFB Donation",
                onClose: () => { onCreateDonation(false); },
                callback: () => { onCreateDonation(true); }
            });

            handler.openIframe();
        } else {
            toast.error("Sign in to make donations.");
        }

    }

    const onCreateDonation = async (isCompleted) => {
        const docRef = doc(collection(db, "donations"));
        const productDocRef = doc(db, "products", product.id);
        console.log(isCompleted);

        const donationDoc = {
            id: product.id,
            image: product.image,
            name: product.name,
            email: authUser.email,
            amount: product.price,
            isCompleted: isCompleted ? true : false,
            status: isCompleted ? "delivered" : "cancelled",
            addedOn: serverTimestamp(),
        };

        await setDoc(docRef, donationDoc).then(async () => {
            toast.success("Donation History Added!");
            await updateDoc(productDocRef, { "numOfDonation": product.numOfDonation + 1 })
        }).catch((error) => {
            toast.error(`Something is wrong: ${error.message}`);
        });
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-8">
                    <div className="m-1 p-2 card shadow-sm">
                        <div className="row d-flex">
                            <div className="col-md-7">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    width="100%"
                                    height={350}
                                    className="rounded shadow"
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                            <div className="col-md-5 d-flex flex-column justify-content-between">
                                <h3>{product.name} </h3>
                                <hr />

                                <small className="text-muted d-flex justify-content-between mb-2">
                                    <span>Added: {product.addedOn}</span>
                                    <b>{toCurrency(product.price)}</b>
                                </small>

                                <div className="border rounded text-center my-2">
                                    <div className="bg-danger white rounded py-3">
                                        Number Of Donation
                                    </div>
                                    <span className="display-4">{product.numOfDonation}</span>
                                </div>

                                <div className="d-flex justify-content-between my-2">
                                    <button className="btn btn-lg btn-success bg_secondary shadow border_none" onClick={() => addItem(product)}>
                                        <ShoppingCart /> Add To Cart
                                    </button>
                                    <button className="btn btn-lg btn-success trans border_none secondary" onClick={() => addSavedItem(product)}>
                                        <small><Heart /> Save</small>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column mt-5">
                            <div className="col-12 mb-3">
                                <h4>Description</h4>
                            </div>

                            <div className="col-12">
                                {product.description}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="m-1 p-2 ">
                        <div className="py-3 px-2">
                            <h5>Quick Donate</h5>
                            <p className="text-muted">Donate without adding anything to cart</p>
                        </div>
                        <div className="d-flex flex-column py-3 border-bottom justify-content-between">
                            <div className="d-flex justify-content-between">
                                <b>Total</b>
                                <b>{toCurrency(product.price)}</b>
                            </div>
                            <small className="text-muted">Delivery fees not included</small>
                        </div>

                        <form onSubmit={makeDonation}>
                            <button type="submit" className="w-100 my-3 btn btn-lg btn-outline-success outline-primary btn_nav">
                                <Heart variant="Bold" />
                                Donate
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

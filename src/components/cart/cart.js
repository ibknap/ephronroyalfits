import styles from '@/components/cart/Cart.module.css'
import { Heart, ShoppingCart } from 'iconsax-react';
import Link from 'next/link';
import { useCart } from '@/pages/cart/cart_context';
import CartItem from '@/components/cart/cart_item';
import toCurrency from '@/components/utils/toCurrency'

export default function Cart() {
    const { items } = useCart();
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            {items.length == 0 &&
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-10">
                            <div className="shadow my-5 mx-2 p-2 text-center rounded">
                                <ShoppingCart className="primary" size="200" />
                                <h4>Your cart is empty!</h4>
                                <p className="text-muted">Browse and start donating!</p>
                                <Link href="/" as="/" className="my-4 btn btn-lg bg_primary white shadow border_none">
                                    Start Donating
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {items.length > 0 &&
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="m-2 shadow-sm p-3 rounded">
                                <div className={styles.card_header}>
                                    Shopping Cart
                                </div>
                                <div className="row mt-2">
                                    {items.map((item) => (
                                        <CartItem key={item.id} item={item} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="m-2 p-2 shadow-sm rounded">
                                <div className={styles.card_header}>
                                    Summary
                                </div>
                                <div className="d-flex flex-column py-3 border-bottom justify-content-between">
                                    <div className="d-flex justify-content-between">
                                        <b>Total</b>
                                        <b>{toCurrency(totalPrice)}</b>
                                    </div>
                                    <small className="text-muted">Delivery fees not included</small>
                                </div>

                                <Link href="#" as="#" className={`w-100 my-3 btn btn-lg btn-success ${styles.btn_nav}`}>
                                    <Heart variant="Bold" />
                                    Donate
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

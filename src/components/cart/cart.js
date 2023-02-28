import styles from '@/components/cart/Cart.module.css'
import { Add, Heart, Minus, ShoppingCart, Trash } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Cart() {
    const [hasItem, setHasItem] = useState(true);

    return (
        <>
            {!hasItem &&
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-10 shadow my-5 p-3 text-center rounded">
                            <ShoppingCart className="primary" size="200" />
                            <h4>Your cart is empty!</h4>
                            <p className="text-muted">Browse and start donating!</p>
                            <Link href="/" className="my-4 btn btn-lg bg_primary white shadow border_none">
                                Start Donating
                            </Link>
                        </div>
                    </div>
                </div>
            }

            {hasItem &&
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="m-2 shadow-sm p-3 rounded">
                                <div className={styles.card_header}>
                                    Shopping Cart
                                </div>
                                <div className="row mt-2">
                                    <div className="col-12">
                                        <ul className="list-unstyled ">
                                            <li className="my-2 p-2 card">
                                                <div className="d-flex my-2 p-2 position-relative">
                                                    <Image
                                                        src="/images/logo.png"
                                                        alt="donation item image"
                                                        className="rounded border"
                                                        width={100}
                                                        height={100}
                                                        priority
                                                    />
                                                    <div className="d-flex flex-column w-75 px-2">
                                                        <span className="secondary ">Bag of adamawa beans from hong LGA 50kg</span>
                                                        <span><b>₦ 20,000.00</b></span>
                                                        <span>Qty: <b>1</b></span>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-between">
                                                    <button className="border_none trans text-danger">
                                                        <Trash />
                                                        Remove
                                                    </button>
                                                    <div className="d-flex">
                                                        <button className="border_none mx-2 bg_primary rounded white shadow-sm">
                                                            <Minus />
                                                        </button>
                                                        <button className="border_none mx-2 bg_primary rounded white shadow-sm">
                                                            <Add />
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
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
                                        <b>₦ 20,000.00</b>
                                    </div>
                                    <small className="text-muted">Delivery fees not included</small>
                                </div>

                                <Link href="#" className={`w-100 my-3 btn btn-lg btn-success ${styles.btn_nav}`}>
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

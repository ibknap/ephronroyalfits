import styles from '@/components/home/Home.module.css'
import { Add, Heart } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import 'swiper/css/navigation';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '@/firebase/fire_config';
import Loader from '@/components/loader/loader';
import toCurrency from '@/components/utils/toCurrency'
import { useCart } from '@/components/cart/cart_context';
import { useSaved } from "@/components/account/saved/saved_context";

export default function Home() {
    const { addItem } = useCart();
    const { addSavedItem } = useSaved();
    const [products, setProducts] = useState([]);
    const [mdProducts, setMdProducts] = useState([]);
    const [healths, setHealths] = useState([]);

    // listening to product
    useEffect(() => {
        const q = query(collection(db, "products"), where('isHealth', '==', false), orderBy("addedOn", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    addedOn: doc.data().addedOn.toDate().toLocaleTimeString()
                };
            });
            setProducts(data);
        });

        return () => { unsubscribe(); };
    }, []);

    // listening to most donated
    useEffect(() => {
        const q = query(collection(db, "products"), orderBy("numOfDonation", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    addedOn: doc.data().addedOn.toDate().toLocaleTimeString()
                };
            });
            setMdProducts(data);
        });

        return () => { unsubscribe(); };
    }, []);

    // listening to health
    useEffect(() => {
        const q = query(collection(db, "products"), where('isHealth', '==', true), orderBy("addedOn", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    addedOn: doc.data().addedOn.toDate().toLocaleTimeString()
                };
            });
            setHealths(data);
        });

        return () => { unsubscribe(); };
    }, []);

    return (
        <>
            <div className={`container mb-5 ${styles.hero}`}>
                <div className="row">
                    <div className="col-sm-8">
                        <div className={`m-2 p-3 shadow-sm rounded ${styles.hero_badge} position-relative`}>
                            <div className="d-flex justify-content-between">
                                <div className={styles.hero_text_container}>
                                    <h1 className={`primary ${styles.hero_text}`}>Affordable</h1>
                                    <h1 className={`secondary ${styles.hero_text}`}>Food for all</h1>
                                </div>
                                <div className={styles.hero_img}>
                                    <Image
                                        src="/images/hero.png"
                                        alt="NEFB"
                                        fill
                                        sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="m-2">
                            <div className="d-flex flex-column justify-content-between">
                                <Link href="#foodBank" className={`mb-2 bg_primary secondary p-3 shadow-sm border rounded ${styles.hero_badge_sm}`}>
                                    <h3 className="fw-light">Looking for a tasty food bank marketplace?</h3>
                                </Link>

                                <Link href="#healthBank" className={`mt-2 bg_secondary primary p-3 shadow-sm border rounded ${styles.hero_badge_sm}`}>
                                    <h3 className="fw-light">Come explore our health bank marketplace.</h3>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* most donated */}
            <div className={`w-100 ${styles.slider_container}`}>
                <span className="h4 fw-normal">Most Donated</span>
                <Swiper
                    modules={[Navigation]}
                    navigation={true}
                    slidesPerView={2}
                    spaceBetween={10}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        986: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        }
                    }}
                >

                    {mdProducts ? mdProducts.map((product) => (
                        <SwiperSlide key={product.id} className={styles.slider}>
                            <Link href={`/product/${product.id}`} as={`/product/${product.id}`} className="secondary">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    crossOrigin="anonymous"
                                />
                                <div className={styles.slider_body}>
                                    <span className={styles.slider_header}>{product.name}</span>
                                    <b>{toCurrency(product.price)}</b>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                        : <div className="my-5">
                            <Loader />
                        </div>
                    }
                </Swiper>
            </div>

            {/* food bank */}
            <div id="foodBank" className="container-fluid py-5 px-lg-5 bg_grey">
                <div className="row">
                    {products ? products.map((product) => (
                        <div key={product.id} className="col-6 col-md-3 col-lg-2">
                            <div className="product_card">
                                <Link href={`/product/${product.id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        crossOrigin="anonymous"
                                    />
                                </Link>

                                <div className="product_body">
                                    <span className="product_header">{product.name}</span>
                                    <b>{toCurrency(product.price)}</b>
                                    <button className="product_add_btn" onClick={() => addItem(product)}>
                                        <Add /> Add To Cart
                                    </button>
                                </div>

                                <button className="product_saved_btn" onClick={() => addSavedItem(product)}>
                                    <Heart variant="Bold" />
                                </button>
                            </div>
                        </div>
                    ))
                        : <div className="my-5">
                            <Loader />
                        </div>
                    }
                </div>
            </div>

            {/* health bank */}
            <div id="healthBank" className="container-fluid py-5 px-lg-5 bg_grey">
                <div className="row">
                    <div className="col-12">
                        <h4>Health Bank</h4>
                    </div>

                    {healths ? healths.map((health) => (
                        <div key={health.id} className="col-6 col-md-3 col-lg-2">
                            <div className="product_card">
                                <Link href={`/product/${health.id}`}>
                                    <img
                                        src={health.image}
                                        alt={health.name}
                                        crossOrigin="anonymous"
                                    />
                                </Link>

                                <div className="product_body">
                                    <span className="product_header">{health.name}</span>
                                    <b>{toCurrency(health.price)}</b>
                                    <button className="product_add_btn" onClick={() => addItem(health)}>
                                        <Add /> Add To Cart
                                    </button>
                                </div>

                                <button className="product_saved_btn" onClick={() => addSavedItem(health)}>
                                    <Heart variant="Bold" />
                                </button>
                            </div>
                        </div>
                    ))
                        : <div className="my-5">
                            <Loader />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

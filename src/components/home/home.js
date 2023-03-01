import styles from '@/components/home/Home.module.css'
import { Add, Heart, Minus, ShoppingCart, Trash } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import MostDonated from '@/components/home/most_donated';

export default function Home() {
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

            <MostDonated />

            <div id="foodBank" className="py-5 px-lg-5 bg_grey">
                <div className="row">
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="product_card">
                            <Link href="#" className="">
                                <Image
                                    src="/images/hero.png"
                                    alt="NEFB"
                                    style={{ objectFit: "cover" }}
                                    fill
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Link>

                            <div className="product_body">
                                <span className="product_header">Bag of oranges from hong here is a test</span>
                                <b>₦ 104,129</b>
                                <button className="product_add_btn">
                                    <Add /> Add To Cart
                                </button>
                            </div>

                            <button className="product_saved_btn">
                                <Heart className="" variant="Bold" />
                            </button>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="product_card">
                            <Link href="#" className="">
                                <Image
                                    src="/images/hero.png"
                                    alt="NEFB"
                                    style={{ objectFit: "cover" }}
                                    fill
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Link>

                            <div className="product_body">
                                <span className="product_header">Bag of oranges from hong here is a test</span>
                                <b>₦ 104,129</b>
                                <button className="product_add_btn">
                                    <Add /> Add To Cart
                                </button>
                            </div>

                            <button className="product_saved_btn">
                                <Heart className="" variant="Bold" />
                            </button>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="product_card">
                            <Link href="#" className="">
                                <Image
                                    src="/images/hero.png"
                                    alt="NEFB"
                                    style={{ objectFit: "cover" }}
                                    fill
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Link>

                            <div className="product_body">
                                <span className="product_header">Bag of oranges from hong here is a test</span>
                                <b>₦ 104,129</b>
                                <button className="product_add_btn">
                                    <Add /> Add To Cart
                                </button>
                            </div>

                            <button className="product_saved_btn">
                                <Heart className="" variant="Bold" />
                            </button>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="product_card">
                            <Link href="#" className="">
                                <Image
                                    src="/images/hero.png"
                                    alt="NEFB"
                                    style={{ objectFit: "cover" }}
                                    fill
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Link>

                            <div className="product_body">
                                <span className="product_header">Bag of oranges from hong here is a test</span>
                                <b>₦ 104,129</b>
                                <button className="product_add_btn">
                                    <Add /> Add To Cart
                                </button>
                            </div>

                            <button className="product_saved_btn">
                                <Heart className="" variant="Bold" />
                            </button>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="product_card">
                            <Link href="#" className="">
                                <Image
                                    src="/images/hero.png"
                                    alt="NEFB"
                                    style={{ objectFit: "cover" }}
                                    fill
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Link>

                            <div className="product_body">
                                <span className="product_header">Bag of oranges from hong here is a test</span>
                                <b>₦ 104,129</b>
                                <button className="product_add_btn">
                                    <Add /> Add To Cart
                                </button>
                            </div>

                            <button className="product_saved_btn">
                                <Heart className="" variant="Bold" />
                            </button>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="product_card">
                            <Link href="#" className="">
                                <Image
                                    src="/images/hero.png"
                                    alt="NEFB"
                                    style={{ objectFit: "cover" }}
                                    fill
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Link>

                            <div className="product_body">
                                <span className="product_header">Bag of oranges from hong here is a test</span>
                                <b>₦ 104,129</b>
                                <button className="product_add_btn">
                                    <Add /> Add To Cart
                                </button>
                            </div>

                            <button className="product_saved_btn">
                                <Heart className="" variant="Bold" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="healthBank" className="py-5 px-lg-5 bg_grey">
                <div className="row">
                    <div className="col-12">
                        <h4>Health Bank</h4>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="product_card">
                            <Link href="#" className="">
                                <Image
                                    src="/images/hero.png"
                                    alt="NEFB"
                                    style={{ objectFit: "cover" }}
                                    fill
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Link>

                            <div className="product_body">
                                <span className="product_header">Bag of oranges from hong here is a test</span>
                                <b>₦ 104,129</b>
                                <button className="product_add_btn">
                                    <Add /> Add To Cart
                                </button>
                            </div>

                            <button className="product_saved_btn">
                                <Heart className="" variant="Bold" />
                            </button>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="product_card">
                            <Link href="#" className="">
                                <Image
                                    src="/images/hero.png"
                                    alt="NEFB"
                                    style={{ objectFit: "cover" }}
                                    fill
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Link>

                            <div className="product_body">
                                <span className="product_header">Bag of oranges from hong here is a test</span>
                                <b>₦ 104,129</b>
                                <button className="product_add_btn">
                                    <Add /> Add To Cart
                                </button>
                            </div>

                            <button className="product_saved_btn">
                                <Heart className="" variant="Bold" />
                            </button>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="product_card">
                            <Link href="#" className="">
                                <Image
                                    src="/images/hero.png"
                                    alt="NEFB"
                                    style={{ objectFit: "cover" }}
                                    fill
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Link>

                            <div className="product_body">
                                <span className="product_header">Bag of oranges from hong here is a test</span>
                                <b>₦ 104,129</b>
                                <button className="product_add_btn">
                                    <Add /> Add To Cart
                                </button>
                            </div>

                            <button className="product_saved_btn">
                                <Heart className="" variant="Bold" />
                            </button>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="product_card">
                            <Link href="#" className="">
                                <Image
                                    src="/images/hero.png"
                                    alt="NEFB"
                                    style={{ objectFit: "cover" }}
                                    fill
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Link>

                            <div className="product_body">
                                <span className="product_header">Bag of oranges from hong here is a test</span>
                                <b>₦ 104,129</b>
                                <button className="product_add_btn">
                                    <Add /> Add To Cart
                                </button>
                            </div>

                            <button className="product_saved_btn">
                                <Heart className="" variant="Bold" />
                            </button>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="product_card">
                            <Link href="#" className="">
                                <Image
                                    src="/images/hero.png"
                                    alt="NEFB"
                                    style={{ objectFit: "cover" }}
                                    fill
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Link>

                            <div className="product_body">
                                <span className="product_header">Bag of oranges from hong here is a test</span>
                                <b>₦ 104,129</b>
                                <button className="product_add_btn">
                                    <Add /> Add To Cart
                                </button>
                            </div>

                            <button className="product_saved_btn">
                                <Heart className="" variant="Bold" />
                            </button>
                        </div>
                    </div>
                    <div className="col-6 col-md-3 col-lg-2">
                        <div className="product_card">
                            <Link href="#" className="">
                                <Image
                                    src="/images/hero.png"
                                    alt="NEFB"
                                    style={{ objectFit: "cover" }}
                                    fill
                                    sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </Link>

                            <div className="product_body">
                                <span className="product_header">Bag of oranges from hong here is a test</span>
                                <b>₦ 104,129</b>
                                <button className="product_add_btn">
                                    <Add /> Add To Cart
                                </button>
                            </div>

                            <button className="product_saved_btn">
                                <Heart className="" variant="Bold" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

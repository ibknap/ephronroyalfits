import styles from '@/components/home/Home.module.css'
import { Add, Heart, Minus, ShoppingCart, Trash } from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <div className={`container ${styles.hero}`}>
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
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="m-2">
                            <div className="d-flex flex-column justify-content-between">
                                <div className={`mb-2 bg_primary secondary p-3 shadow-sm border rounded ${styles.hero_badge_sm}`}>
                                    Under
                                </div>
                                <div className={`mt-2 bg_secondary primary p-3 shadow-sm border rounded ${styles.hero_badge_sm}`}>
                                    Development
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

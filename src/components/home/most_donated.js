import styles from '@/components/home/Home.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import 'swiper/css/navigation';
import Image from "next/image";
import Link from "next/link";

export default function MostDonated() {
    return (
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
                        slidesPerView: 5,
                        spaceBetween: 10,
                    }
                }}
            >
                <SwiperSlide className={styles.slider}>
                    <Link href="#" className="secondary">
                        <Image
                            src="/images/hero.png"
                            alt="NEFB"
                            style={{ objectFit: "cover" }}
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                        <div className={styles.slider_body}>
                            <span className={styles.slider_header}>Bag of oranges from hong here is a test</span>
                            <b>₦ 104,129</b>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={styles.slider}>
                    <Link href="#" className="secondary">
                        <Image
                            src="/images/hero.png"
                            alt="NEFB"
                            style={{ objectFit: "cover" }}
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                        <div className={styles.slider_body}>
                            <span className={styles.slider_header}>Bag of oranges from hong here is a test</span>
                            <b>₦ 104,129</b>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={styles.slider}>
                    <Link href="#" className="secondary">
                        <Image
                            src="/images/hero.png"
                            alt="NEFB"
                            style={{ objectFit: "cover" }}
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                        <div className={styles.slider_body}>
                            <span className={styles.slider_header}>Bag of oranges from hong here is a test</span>
                            <b>₦ 104,129</b>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={styles.slider}>
                    <Link href="#" className="secondary">
                        <Image
                            src="/images/hero.png"
                            alt="NEFB"
                            style={{ objectFit: "cover" }}
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                        <div className={styles.slider_body}>
                            <span className={styles.slider_header}>Bag of oranges from hong here is a test</span>
                            <b>₦ 104,129</b>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={styles.slider}>
                    <Link href="#" className="secondary">
                        <Image
                            src="/images/hero.png"
                            alt="NEFB"
                            style={{ objectFit: "cover" }}
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                        <div className={styles.slider_body}>
                            <span className={styles.slider_header}>Bag of oranges from hong here is a test</span>
                            <b>₦ 104,129</b>
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={styles.slider}>
                    <Link href="#" className="secondary">
                        <Image
                            src="/images/hero.png"
                            alt="NEFB"
                            style={{ objectFit: "cover" }}
                            fill
                            sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                        <div className={styles.slider_body}>
                            <span className={styles.slider_header}>Bag of oranges from hong here is a test</span>
                            <b>₦ 104,129</b>
                        </div>
                    </Link>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
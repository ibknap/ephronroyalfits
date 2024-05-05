import heroImages from "@/components/home/hero_images";
let $ = require("jquery");
if (typeof window !== "undefined") window.$ = window.jQuery = require("jquery");
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import Link from "next/link";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

export default function Hero() {
  const heroConfig = {
    autoplayTimeout: 3000,
    loop: true,
    autoplay: true,
    dots: false,
    nav: false,
    items: 1,
  };

  return (
    <div className="container-fluid">
      <div className="row hero-m">
        <div className="col-12 black position-relative">
          <div className="row justify-content-center align-items-center border-top">
            <div className="col-md-6 p-0">
              <OwlCarousel {...heroConfig}>
                {heroImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="image"
                    priority
                    className="object-fit-cover hero-size"
                  />
                ))}
              </OwlCarousel>
            </div>

            <div className="col-md-6 text-center px-md-5 mt-4 mt-md-0">
              <h3 className="fw-normal">CLOTHES, JEWELRY, JOURNALS & MORE</h3>

              <h5 className="fw-light mt-4">
                With our wide range of quality best sellers and selling offers
                you can shop limitless and timelessly.
              </h5>

              <Link
                href="/products"
                className="btn btn-lg btn-dark bg_blue border-0 rounded-0 mt-4"
              >
                BEST SELLERS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

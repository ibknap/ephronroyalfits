import heroImages from "@/components/home/hero_images";
let $ = require("jquery");
if (typeof window !== "undefined") window.$ = window.jQuery = require("jquery");
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
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
    <div className="container-fluid p-0 m-0">
      <div className="row m-0">
        <div className="col-12 p-0 m-0 position-relative">
          <OwlCarousel {...heroConfig}>
            {heroImages.map((image, index) => (
              <div className="slider" key={index}>
                <img src={image} alt="hero image" />
              </div>
            ))}
          </OwlCarousel>

          <div className="hero-overlay" />

          <div className="hero-logo">
            <img src="/logo/svg/logo_text_white_trans.svg" alt="logo" width={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

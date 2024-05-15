import Head from "next/head";
import Navbar from "@/components/navigation/navbar/navbar";
import Footer from "@/components/navigation/footer/footer";
import { getWSSchema, getWPSchema, getLBSchema } from "@/components/schema";
import { useState } from "react";
import SearchBox from "@/components/search/search";
import Hero from "@/components/home/hero";
import Products from "@/components/products/products";
import Link from "next/link";

export default function HomePage() {
  const [showSearch, setShowSearch] = useState(false);
  const handleShowSearch = (state) => setShowSearch(state);

  // page default data
  const pageName = "Ephron Royal 'fits | Art & Fashion";
  const pageDesc =
    "Elevate your style with Ephron Royal 'fits, where art meets fashion in a harmonious blend of creativity and elegance. Explore our online store for a curated collection of unique art-inspired fashion pieces that allow you to express your individuality. Immerse yourself in a world where every garment tells a story, bringing together the realms of art and fashion seamlessly. Discover the perfect fusion of artistic expression and sartorial sophistication at Ephron Royal 'fits.";
  const pageKeywords =
    "Art-inspired fashion, Unique fashion pieces, Creative clothing, Fashion with a story, Wearable art, Eccentric style, Artistic expression in fashion, Fashion showcase, Individuality in clothing, Ephron Royal 'fits online store";
  const baseURL = "https://ephronroyalfits.com";

  // web site schema
  const wSSchema = getWSSchema(baseURL);

  // web page schema
  const wPSchema = getWPSchema(pageName, pageDesc, baseURL, [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseURL,
    },
  ]);

  // local business schema
  const lBSchema = getLBSchema(
    pageName,
    {
      streetAddress: "Nill Ifesowapo crescent",
      addressLocality: "Ado",
      addressRegion: "Ekiti",
      postalCode: "360101",
      addressCountry: "NG",
    },
    "+234-706-386-9144",
    "ephronroyalfits@gmail.com",
    baseURL,
    `${baseURL}/logo/png/logo.png`,
    "Cash, Credit Card, Transfer",
    "NGN, USD, EURO",
    "Mo-Fr 09:00-17:00",
    {
      latitude: "7.6183612",
      longitude: "5.1391947",
    }
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>{pageName}</title>

        <meta name="description" content={pageDesc} />
        <meta name="keywords" content={pageKeywords} />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/x-icon" href="/logo/png/logo_trans.png" />
        <meta name="author" content="Ephron Royal 'fits" />
        <meta property="og:title" content={pageName} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo/png/logo_text.png" />
        <meta property="og:image:width" content="1277" />
        <meta property="og:image:height" content="473" />
        <meta property="og:url" content={baseURL} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:site_name" content={pageName} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(wSSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(wPSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lBSchema) }}
        />
      </Head>

      <main>
        <Navbar emitShowSearch={handleShowSearch} />
        <Hero />

        <div className="my-2" />

        <div className="container-fluid p-0">
          <div className="row p-0 m-0">
            <div className="col-6 col-md-3 p-0">
              <div className="position-relative me-1 mb-2">
                <Link href="/category/accessories/sunglasses">
                  <img
                    src="images/sunglasses.png"
                    alt="image"
                    width="100%"
                    height={250}
                    className="object-fit-cover"
                    style={{ objectPosition: "top" }}
                  />
                  <h5 className="position-absolute bottom-0 text-white fw-bold px-2">
                    SUNGLASSES
                  </h5>
                </Link>
              </div>
            </div>

            <div className="col-6 col-md-3 p-0">
              <div className="position-relative ms-1 mb-2 mx-md-1">
                <Link href="/category/tees">
                  <img
                    src="images/tee.png"
                    alt="image"
                    width="100%"
                    height={250}
                    className="object-fit-cover"
                    style={{ objectPosition: "top" }}
                  />
                  <h5 className="position-absolute bottom-0 text-dark fw-bold px-2">
                    TEES
                  </h5>
                </Link>
              </div>
            </div>

            <div className="col-6 col-md-3 p-0">
              <div className="position-relative me-1 mb-2 mx-md-1">
                <Link href="/category/gems/rings">
                  <img
                    src="images/ring.png"
                    alt="image"
                    width="100%"
                    height={250}
                    className="object-fit-cover"
                    style={{ objectPosition: "top" }}
                  />
                  <h5 className="position-absolute bottom-0 text-white fw-bold px-2">
                    RINGS
                  </h5>
                </Link>
              </div>
            </div>

            <div className="col-6 col-md-3 p-0">
              <div className="position-relative ms-1 mb-2">
                <Link href="/category/polos">
                  <img
                    src="images/polo.png"
                    alt="image"
                    width="100%"
                    height={250}
                    className="object-fit-cover"
                    style={{ objectPosition: "top" }}
                  />
                  <h5 className="position-absolute bottom-0 text-white fw-bold px-2">
                    POLOS
                  </h5>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Products
          length={8}
          title="NEW ARRIVALS"
          tag="new"
          category={null}
          random={false}
        />

        <Products
          length={4}
          title="ACCESSORIES"
          tag={null}
          category="accessories"
          random={false}
        />

        <hr className="mx-5 p-0 m-0" />

        <Products
          length={8}
          title={null}
          tag={null}
          category={null}
          sub_category={null}
          random={true}
        />

        <div className="container my-5">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <Link
                href="/products"
                className="btn btn-lg btn-outline-primary rounded-0"
              >
                All products
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>

      {showSearch && (
        <SearchBox show={showSearch} onHide={() => setShowSearch(false)} />
      )}
    </>
  );
}

import Head from "next/head";
import Navbar from "@/components/navigation/navbar/navbar";
import Footer from "@/components/navigation/footer/footer";
import { getWSSchema, getWPSchema, getLBSchema } from "@/components/schema";
import { Inter } from "next/font/google";
import { Setting2 } from "iconsax-react";
import { useState } from "react";
import SearchBox from "@/components/search/search";

const inter = Inter({ subsets: ["latin"] });

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

      <main className={inter.className}>
        <Navbar emitShowSearch={handleShowSearch} />
        <div className="bottom_spacer" />

        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <Setting2 size={200} />
            </div>

            <div className="col-md-4 mt-3 text-center">
              <div className=" alert alert-dark border-0 rounded-0">
                <b>Ephron Royal &apos;fits</b> currently under development
              </div>
            </div>
          </div>
        </div>

        {/* <Home /> */}
        <Footer />
      </main>

      {showSearch && (
        <SearchBox show={showSearch} onHide={() => setShowSearch(false)} />
      )}
    </>
  );
}

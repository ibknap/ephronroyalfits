import Head from "next/head";
import { getWSSchema, getWPSchema, getLBSchema } from "@/components/schema";
import Link from "next/link";

export default function HomePage() {
  // page default data
  const pageName =
    "North East Food Bank | Fighting Hunger and Poverty in Nigeria";
  const pageDesc =
    "North East Food Bank seeks to eliminate hunger and malnutrition among vulnerable populations in the Northeast. It is a livelihood programme developed by Big Family 360 Foundation Nigeria.";
  const baseURL = "https://northeastfoodbank.org";

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
      streetAddress: "Barracks road Jimeta Yola",
      addressLocality: "Jimeta",
      addressRegion: "Yola",
      postalCode: "640211",
      addressCountry: "NG",
    },
    "+234-703-318-0897",
    "northeastfoodbankorg@gmail.com",
    baseURL,
    `${baseURL}/images/logo.png`,
    "Cash, Credit Card, Transfer",
    "NGN, USD, EURO",
    "Mo-Fr 09:00-17:00",
    {
      latitude: "9.2034924",
      longitude: "12.3888667",
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
        <meta name="description" content={pageDesc} />
        <meta
          name="keywords"
          content="Food bank, Donations, Charity, Nonprofit, Nigeria, Hunger, Poverty, North East, Community support, Food insecurity, Volunteer opportunities, Social impact, Humanitarian aid, Relief organization, Sustainable development"
        />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="icon"
          type="image/x-icon"
          href="/images/fav_logo_trans.png"
        />
        <meta name="author" content="North East Food Bank" />
        <title>{pageName}</title>

        <meta property="og:title" content={pageName} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.png" />
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

      <div className="page-not-found pt-5">
        <div className="bg-light shadow">
          <h2 className="primary">404</h2>
          <h3 className="mt-4">Oops! Page Not Found</h3>

          <div className="mt-5">
            <Link
              href="/"
              className="btn btn-lg m-2 m-md-0 btn_primary bg_primary white"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

import Head from 'next/head';
import Navbar from '@/components/nav/navbar/navbar';
import Footer from '@/components/nav/footer/footer';
import { getHomeWSSchema, getHomeWPSchema, getHomeLBSchema } from '@/components/home/schema';
import { Information } from 'iconsax-react';

export default function Home() {
  // page default data
  const pageName = "North East Food Bank | Fighting Hunger and Poverty in Nigeria";
  const pageURL = "https://northeastfoodbank.org";

  // web site schema
  const homeWSSchema = getHomeWSSchema(pageURL);

  // web page schema
  const homeWPSchema = getHomeWPSchema(
    pageName,
    "North East Food Bank seeks to eliminate hunger and malnutrition among vulnerable populations in the Northeast. It is a livelihood programme developed by Big Family 360 Foundation Nigeria.",
    pageURL,
    [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": pageURL
      }
    ]
  );

  // local business schema
  const homeLBSchema = getHomeLBSchema(
    pageName,
    {
      streetAddress: "Barracks road Jimeta Yola",
      addressLocality: "Jimeta",
      addressRegion: "Yola",
      postalCode: "640211",
      addressCountry: "NG"
    },
    "+234-703-318-0897",
    "info@northeastfoodbank.org",
    pageURL,
    `${pageURL}/images/logo.png`,
    "Cash, Credit Card, Transfer",
    "NGN, USD, EURO",
    "Mo-Fr 09:00-17:00",
    {
      latitude: "9.2034924",
      longitude: "12.3888667"
    }
  );

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="North East Food Bank seeks to eliminate hunger and malnutrition among vulnerable populations in the Northeast. It is a livelihood programme developed by Big Family 360 Foundation Nigeria." />
        <meta name="keywords" content="Food bank, Donations, Charity, Nonprofit, Nigeria, Hunger, Poverty, North East, Community support, Food insecurity, Volunteer opportunities, Social impact, Humanitarian aid, Relief organization, Sustainable development" />
        <meta name="theme-color" content="#f8c129" />
        <link rel="icon" type="image/x-icon" href="/images/fav_logo_trans.png" />
        <meta name="author" content="North East Food Bank" />
        <title>North East Food Bank | Fighting Hunger and Poverty in Nigeria</title>

        <meta property="og:title" content="North East Food Bank | Fighting Hunger and Poverty in Nigeria" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:image:width" content="1277" />
        <meta property="og:image:height" content="473" />
        <meta property="og:url" content={pageURL} />
        <meta property="og:description" content="North East Food Bank seeks to eliminate hunger and malnutrition among vulnerable populations in the Northeast. It is a livelihood programme developed by Big Family 360 Foundation Nigeria." />
        <meta property="og:site_name" content="North East Food Bank" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWSSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWPSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeLBSchema) }} />
      </Head>
      <div className="bottom_spacer" />

      <div className='text-dark text-center my-4'>
        <Information size="300" className="grey_dark" variant="Bold" />
        <h3 className="grey_dark">
          Under development
        </h3>
      </div>

      <Navbar />
      <Footer />
    </>
  )
}

import Head from 'next/head';
import Navbar from '@/components/nav/navbar/navbar';
import Footer from '@/components/nav/footer/footer';
import { getWSSchema, getWPSchema, getLBSchema } from '@/components/schema';
import Donate from '@/components/account/donate';

export default function DonatePage() {
    // page default data
    const pageName = "NEFB - My Donate";
    const pageDesc = "North East Food Bank seeks to eliminate hunger and malnutrition among vulnerable populations in the Northeast. It is a livelihood programme developed by Big Family 360 Foundation Nigeria.";
    const baseURL = "https://northeastfoodbank.org";
    const parentURL = "https://northeastfoodbank.org/account";
    const pageURL = "https://northeastfoodbank.org/account/donate";

    // web site schema
    const wSSchema = getWSSchema(pageURL);

    // web page schema
    const wPSchema = getWPSchema(
        pageName,
        pageDesc,
        pageURL,
        [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": baseURL
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "My Account",
                "item": parentURL
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": pageName,
                "item": pageURL
            }
        ]
    );

    // local business schema
    const lBSchema = getLBSchema(
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
        baseURL,
        `${baseURL}/images/logo.png`,
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
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content={pageDesc} />
                <meta name="keywords" content="Food bank, Donations, Charity, Nonprofit, Nigeria, Hunger, Poverty, North East, Community support, Food insecurity, Volunteer opportunities, Social impact, Humanitarian aid, Relief organization, Sustainable development" />
                <meta name="theme-color" content="#ffffff" />
                <link rel="icon" type="image/x-icon" href="/images/fav_logo_trans.png" />
                <meta name="author" content="North East Food Bank" />
                <title>{pageName}</title>

                <meta property="og:title" content={pageName} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/images/logo.png" />
                <meta property="og:image:width" content="1277" />
                <meta property="og:image:height" content="473" />
                <meta property="og:url" content={pageURL} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:site_name" content={pageName} />

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(wSSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(wPSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lBSchema) }} />
            </Head>

            {/* page content */}
            <Navbar />
            <div className="bottom_spacer" />
            <Donate />
            <Footer />
        </>
    )
}

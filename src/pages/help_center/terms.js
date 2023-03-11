import Head from 'next/head';
import Navbar from '@/components/nav/navbar/navbar';
import Footer from '@/components/nav/footer/footer';
import { getWSSchema, getWPSchema, getLBSchema } from '@/components/schema';
import Terms from '@/components/help_center/terms';

export default function TermsPage() {
    // page default data
    const pageName = "NEFB - Terms";
    const pageDesc = "Take a look into your terms of conduct and use.";
    const baseURL = "https://northeastfoodbank.org";
    const parentURL = "https://northeastfoodbank.org/help_center";
    const pageURL = "https://northeastfoodbank.org/help_center/terms";

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
                "name": "Help Center",
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
        "northeastfoodbankorg@gmail.com",
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
            <Terms />
            <Footer />
        </>
    )
}

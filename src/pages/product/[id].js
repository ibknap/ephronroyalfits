import Head from 'next/head';
import Navbar from '@/components/nav/navbar/navbar';
import Footer from '@/components/nav/footer/footer';
import { getWSSchema, getWPSchema } from '@/components/schema';

export async function getServerSideProps({ params }) {
    const id = params.id;
    const product = await fetch(`/api/products/${id}`).then(res => res.json());
    return { props: { product } };
}

export default function ProductDetailPage({ product }) {
    // page default data
    const pageName = `NEFB - ${product.name}`;
    const pageDesc = "North East Food Bank's help center desk answering all question and live chatting 24 hours 7 days including holidays.";
    const baseURL = "https://northeastfoodbank.org";
    const pageURL = `https://northeastfoodbank.org/product/${id}`;

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
                "name": pageName,
                "item": pageURL
            }
        ]
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
            </Head>

            {/* page content */}
            <Navbar />
            <div className="bottom_spacer" />
            Product ID: {id}
            <br />
            <b>Product Name:</b> {name}
            <Footer />
        </>
    )
}

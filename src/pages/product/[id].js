import Head from 'next/head';
import Navbar from '@/components/navigation/navbar/navbar';
import Footer from '@/components/navigation/footer/footer';
import { getWSSchema, getWPSchema } from '@/components/schema';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/fire_config';
import Product from '@/components/product/product';
import Script from 'next/script';

export async function getServerSideProps({ params }) {
    const id = params.id;
    let product = {};
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) product = docSnap.data();
    return {
        props: {
            product: {
                id: id,
                ...product,
                addedOn: product.addedOn.toDate().toLocaleDateString()
            },
        }
    };
}

export default function ProductDetailPage({ product }) {
    // page default data
    const pageName = `NEFB - ${product.name}`;
    const pageDesc = product.description;
    const baseURL = "https://northeastfoodbank.org";
    const pageURL = `https://northeastfoodbank.org/product/${product.id}`;

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
            <Script src="https://js.paystack.co/v1/inline.js" />

            {/* page content */}
            <Navbar />
            <div className="bottom_spacer" />
            <Product product={product} />
            <Footer />
        </>
    )
}

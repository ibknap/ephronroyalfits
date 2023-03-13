import Head from 'next/head'
import Sidebar from '@/components/dashboard/sidebar'
import { getWSSchema, getWPSchema, getLBSchema } from '@/components/schema';
import Newsletters from '@/components/dashboard/newsletters'
import { useAuth } from '@/firebase/fire_auth_context';
import { db } from '@/firebase/fire_config';
import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import NeedAuth from '@/components/restrictions/need_auth';
import NeedAccess from '@/components/restrictions/need_access';
import Loader from '@/components/loader/loader';
import { toast } from 'react-toastify';

export default function DashboardNewslettersPage() {
    const { authUser } = useAuth();
    const [isAdmin, setIsAdmin] = useState(null);

    // page default data
    const pageName = "NEFB - Dashboard Live Chat";
    const pageDesc = "Get to learn more about us and how we work at NEFB, as we seek to eliminate hunger and malnutrition among vulnerable populations in the Northeast.";
    const baseURL = "https://northeastfoodbank.org";
    const pageURL = "https://northeastfoodbank.org/dashboard/newsletters";

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

    // listening to user
    useEffect(() => {
        if (authUser) {
            const userRef = doc(db, "users", authUser.email);

            const unsubscribe = onSnapshot(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    setIsAdmin(data.isAdmin);
                } else {
                    toast.error("User data not found");
                }
            });

            return () => { unsubscribe(); };
        }
    }, [authUser]);

    if (!authUser) return <NeedAuth fullHeight={true} />

    if (isAdmin === null) return <Loader fullHeight={true} />

    if (!isAdmin) return <NeedAccess fullHeight={true} />

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
            <Sidebar />
            <Newsletters />
        </>
    )
}
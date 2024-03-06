import Head from "next/head";
import Navbar from "@/components/navigation/navbar/navbar";
import Footer from "@/components/navigation/footer/footer";
import { getWSSchema, getWPSchema, getLBSchema } from "@/components/schema";
import { useState } from "react";

export default function PrivacyPage() {
  const [showSearch, setShowSearch] = useState(false);
  const handleShowSearch = (state) => setShowSearch(state);

  // page default data
  const pageName = "Ephron Royal 'fits - Privacy Policy";
  const pageDesc =
    "Elevate your style with Ephron Royal 'fits, where art meets fashion in a harmonious blend of creativity and elegance. Explore our online store for a curated collection of unique art-inspired fashion pieces that allow you to express your individuality. Immerse yourself in a world where every garment tells a story, bringing together the realms of art and fashion seamlessly. Discover the perfect fusion of artistic expression and sartorial sophistication at Ephron Royal 'fits.";
  const pageKeywords =
    "Art-inspired fashion, Unique fashion pieces, Creative clothing, Fashion with a story, Wearable art, Eccentric style, Artistic expression in fashion, Fashion showcase, Individuality in clothing, Ephron Royal 'fits online store";
  const baseURL = "https://ephronroyalfits.com/";
  const pageURL = "https://ephronroyalfits.com/privacy";

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
    {
      "@type": "ListItem",
      position: 2,
      name: pageName,
      item: pageURL,
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
        <div className="bottom_spacer" />

        <div className="container mb-5">
          <div className="row justify-content-center">
            <div className="col-md-8 text-start">
              <h4 className="fw-bold">RIVACY POLICY</h4>
              <p className="mb-3">
                This Privacy Policy outlines how EPHRON ROYAL &apos;FITS collects,
                uses, discloses, and manages your personal information when you
                visit our website or make a purchase. By using our website, you
                consent to the terms outlined in this policy.
              </p>

              <h5 className="mb-2 fw-bold">INFORMATION WE COLLECT:</h5>
              <ol>
                <li>
                  <b>Personal Information:</b>
                  <p>
                    When you make a purchase, we collect information such as
                    your name, billing address, shipping address, email address,
                    and phone number. If you create an account, we may also
                    store your username and password.
                  </p>
                </li>

                <li>
                  <b>Payment Information:</b>
                  <p>
                    To process payments, we collect your payment details,
                    including card information. However, we do not store this
                    information; it is securely processed through our payment
                    gateway.
                  </p>
                </li>

                <li>
                  <b>Browsing Information:</b>
                  <p>
                    We automatically receive and store certain types of
                    information when you interact with our website, such as your
                    IP address, browser type, device information, and pages
                    visited.
                  </p>
                </li>
              </ol>

              <h5 className="mb-2 fw-bold">HOW WE USE YOUR INFORMATION:</h5>
              <ol>
                <li>
                  <b>Order Fulfilment:</b>
                  <p>
                    We use your personal and payment information to process and
                    fulfil your orders.
                  </p>
                </li>

                <li>
                  <b>Communication:</b>
                  <p>
                    We may use your contact information to communicate with you
                    about your orders, promotions, and updates related to our
                    products and services.
                  </p>
                </li>

                <li>
                  <b>Account Management:</b>
                  <p>
                    If you create an account, we use your information to manage
                    and secure your account.
                  </p>
                </li>

                <li>
                  <b>Analytics:</b>
                  <p>
                    We use browsing information to analyse trends, track user
                    activity, and improve our website&apos;s performance.
                  </p>
                </li>
              </ol>

              <h5 className="mb-2 fw-bold">
                SHARING YOUR INFORMATION DETAILS:
              </h5>
              <ol>
                <li>
                  <b>Other reasonable parties:</b>
                  <p>
                    We may share your information with other reasonable service
                    providers, such as shipping and payment processors, to
                    facilitate order fulfilment.
                  </p>
                </li>

                <li>
                  <b>Legal Compliance:</b>
                  <p>
                    We may disclose your information when required by law or to
                    protect our rights and comply with legal processes.
                  </p>
                </li>
              </ol>

              <h5 className="mb-2 fw-bold">YOUR CHOICES:</h5>
              <ol>
                <li>
                  <b>Account Information:</b>
                  <p>
                    You can review and update your account information by
                    logging into your account on our website.
                  </p>
                </li>

                <li>
                  <b>Marketing and Other Commendable Communications:</b>
                  <p>
                    You can opt-out of receiving fashion tips or ideas and
                    relevant promotional emails by following the instructions in
                    the emails or contacting us directly.
                  </p>
                </li>
              </ol>

              <h5 className="mb-2 fw-bold">SECURITY:</h5>
              <ol>
                <li>
                  We implement security measures to protect your information,
                  both during transmission and once it is received
                </li>
              </ol>

              <h5 className="mb-2 fw-bold">CONCERNING COOKIES:</h5>
              <ol>
                <li>
                  We use cookies to enhance your browsing experience and analyse
                  website traffic. You can choose to disable cookies, but this
                  may affect certain features of our website from your end.
                </li>
              </ol>

              <h5 className="mb-2 fw-bold">
                ANY REWARDABLE ATTRIBUTE TO CHANGES IN THE FUTURE:
              </h5>
              <ol>
                <li>
                  We may update our Privacy Policy from time to time. Any
                  changes will be posted on this page, and we encourage you to
                  review the policy periodically.
                </li>
              </ol>

              <h5 className="mb-2 fw-bold">CONTACT US:</h5>
              <ol>
                <li>
                  If you have any further questions or concerns about our
                  Privacy Policy, please contact us at [your contact email/phone
                  number].
                </li>
              </ol>
              
              <b>Thank you for trusting EPHRON ROYAL &apos;FITS</b>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

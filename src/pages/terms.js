import Head from "next/head";
import Navbar from "@/components/navigation/navbar/navbar";
import Footer from "@/components/navigation/footer/footer";
import { getWSSchema, getWPSchema, getLBSchema } from "@/components/schema";
import { useState } from "react";

export default function TermsPage() {
  const [showSearch, setShowSearch] = useState(false);
  const handleShowSearch = (state) => setShowSearch(state);

  // page default data
  const pageName = "Ephron Royal 'fits - Terms";
  const pageDesc =
    "Elevate your style with Ephron Royal 'fits, where art meets fashion in a harmonious blend of creativity and elegance. Explore our online store for a curated collection of unique art-inspired fashion pieces that allow you to express your individuality. Immerse yourself in a world where every garment tells a story, bringing together the realms of art and fashion seamlessly. Discover the perfect fusion of artistic expression and sartorial sophistication at Ephron Royal 'fits.";
  const pageKeywords =
    "Art-inspired fashion, Unique fashion pieces, Creative clothing, Fashion with a story, Wearable art, Eccentric style, Artistic expression in fashion, Fashion showcase, Individuality in clothing, Ephron Royal 'fits online store";
  const baseURL = "https://ephronroyalfits.com/";
  const pageURL = "https://ephronroyalfits.com/terms";

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
              <h4 className="mb-3 fw-bold">TERMS AND CONDITIONS</h4>

              <h5 className="mb-2 fw-bold">PURCHASE</h5>
              <p>
                Complete and accurate information must be provided at the time
                of purchase. And we may ask for more information if needed, to
                make sure your order is successful.
              </p>

              <p>
                Ephron is under no obligation to resend the order at our expense
                to the proper address if you submit an inaccurate address.
              </p>

              <h5 className="mb-2 fw-bold">PRE ORDER</h5>
              <p>
                Pre-order items are more controlled as it is only accessible for
                some specific products and services with their necessary
                information like the approximate delivery time frame. Kindly
                make sure you are aware of the following Pre-Order terms prior
                to finalizing your purchase.
              </p>

              <p>
                Due to our General Returns Policy, all pre-orders transactions
                are non-refundable and uncancellable before shipment.
              </p>

              <p>
                To guarantee your Pre-Order, you must fulfil the entire
                recommended retail price (RRP) at the time of purchase.
              </p>

              <p>
                Kindly anticipate a delay between the time of purchase and the
                actual delivery of the product due to the nature of pre-order
                transactions. Additionally, shipping schedules are subject to
                change. In the event of unanticipated delays, our customer
                service staff will contact you via email.
              </p>

              <p>
                Your pre-order item(s) will be shipped separately from others
                due to important measures
              </p>

              <h5 className="mb-2 fw-bold">PRICING</h5>
              <p>
                Following order processing, the amount will immediately be
                converted to reflect the current exchange rates and deducted
                from your bank account. And all prices displayed at checkout are
                in $, £ and ₦; exactly as viewed on the website.
              </p>

              <p>
                Concerning the currency conversion rate, your bank may tend to
                charge more than the actual price. But we commend the right to
                always make the actual price known.
              </p>

              <h5 className="mb-2 fw-bold">PAYMENT METHOD</h5>
              <p>
                Payment methods accepted by Ephron include Paystack, PayPal,
                debit (Visa/MasterCard), and credit cards. Within 24 hours of
                making your purchase, you will receive an automated order
                confirmation email that contains the specifics of your
                transaction once you have paid for it. This email may be
                delivered to your SPAM or JUNK mailbox, depending on your email
                security settings.
              </p>

              <p>
                Please send an email to Ephronroyalfits@gmail.com if you have
                not received your order confirmation email, and if you are
                experiencing trouble checking out, and we will be pleased to
                help.
              </p>

              <h5 className="mb-2 fw-bold">SECURITY</h5>
              <p>
                Your credit card information is never automatically stored by
                Ephron during a transaction. We will not keep credit card
                information provided by customers via phone or email.
              </p>

              <h5 className="mb-2 fw-bold">PROCESSING OF ORDERS</h5>
              <p>
                Orders are processed by Ephron on business days, which are
                Monday through Friday from different warehouses all over the
                world excepting public holidays.
              </p>

              <p>
                On business days, orders are dispatched the next day or as soon
                as possible up to three days in advance. Orders placed before
                this time will be shipped the following working day. Once your
                order has been shipped from our end, you should anticipate
                receiving a separate automated email with your tracking
                information from any esteemed logistic company
              </p>

              <p>
                We&apos;ll ship using FedEx, Hiroshima, DHL, or another company.
                Although delivery windows cannot be guaranteed, deliveries
                should arrive between one and five business days, depending on
                your location.
              </p>

              <h5 className="mb-2 fw-bold">SHIPPING WORLD WIDE</h5>
              <p>
                Ephron ships to all countries all over the world depending on a
                capable receiving options available. Our time of delivery across
                the globe would comprise a week for both shipping and finding
                the best possible source according to location, and another 2
                weeks with no further delay prior to shipment.
              </p>

              <p>
                Remember, this time is an estimate, so your order may arrive
                before, on, or slightly after your estimated delivery date.
              </p>

              <p>
                Please email us at Ephonroyalfits@gmail.com with your complete
                name and order number if you have not received your requested
                items within this time limit, and we will look into the matter
                on your behalf.
              </p>

              <p>
                If there is a need to resend your package because of
                customer-related issues, there will be a redispatch fee. The
                package&apos;s weight and destination may have an impact on this
                redispatch fee.
              </p>

              <p>
                Should your order not be completed but shipped, we reserve the
                right to cancel it if we are unable to provide you with the
                products you ordered. In the event that this happens, we will
                notify you right away. If you would like to cancel your order on
                your own, please email Ephronroyalfits@gmail.com and if
                there&apos;s anything else.
              </p>

              <h5 className="mb-2 fw-bold">MISSING PRODUCT</h5>
              <p>
                In the extremely uncommon event that a product is missing from
                an order when it is delivered, please email
                Ephronroyalfits@gmail.com with your order number and the product
                name or code that is missing, and we will look into it further.
              </p>

              <h5 className="mb-2 fw-bold">IN THE CASE OF RETURNING PRODUCT</h5>
              <p>
                As required by law, any products you return to Ephron will be
                handled in line with our Returns Policy. Additionally, buyers
                are responsible for paying for any returned overseas orders,
                whether they are general or defective.
              </p>

              <p>
                Owing to our degree of assistance, reimbursement for returned
                shipping (for faulty items only) will only be granted in
                exchange for a lookalike or another pricey item equal to the
                cost of the original shipment.
              </p>

              <p>
                It is important to remember that customers will only be
                reimbursed for shipping costs if they send a shipment receipt
                with their returned items.
              </p>

              <h5 className="mb-2 fw-bold">REFUND POLICY</h5>
              <p>
                In the event that a cancelled order has already been charged to
                the customer&apos;s credit card, Ephron will refund the client
                the full amount within 10 business days.
              </p>

              <p>
                If you use Paystack or PayPal, you will need to wait three to
                ten working days incase of any invalid/unsuccessful transaction.
              </p>

              <p>
                Its also important that you&apos;re aware of Paystack&apos;s
                gateway strategies, which require that the receiving account
                number be changed for every new transaction.
              </p>

              <p>
                Please note that in the event of an unsuccessful transaction,
                particularly in cases where the buyer has no fault, a customer
                who agrees to be reimbursed with a lookalike or another
                expensive item of equivalent value will not be able to obtain a
                cash refund.
              </p>

              <h5 className="mb-2 fw-bold">OTHER USEFUL LEGAL ADVICE </h5>
              <p>
                Orders may be cancelled at any moment for any reason that the
                brand deems suitable, including insufficient stock, a suspicion
                of fraud, or an inability to authorize a payment.
              </p>

              <p>
                The Ephron online store maintains the right, at any time and
                without prior notice, to change any or all of the (intellectual
                property) material on this website, as well as the services and
                goods mentioned within.
              </p>

              <p>
                Ephron does not ask for private personal information, bank
                account information, or details of any customer&apos;s
                identification.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

import toCurrency from "@/components/utils/toCurrency";
import nodemailer from "nodemailer";

export default async (req, res) => {
  if (req.method === "POST") {
    const { order, email } = req.body;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "ephronroyalfits@gmail.com",
        pass: "pgvevuzsvvavncrs",
      },
    });

    const mailOptions = {
      from: "Ephron Royal 'fits <ephronroyalfits@gmail.com>",
      to: email,
      subject: "Order placed - Ephron Royal 'fits",
      html: `
        <div>
          <div align="center">
            <img src="https://ephronroyalfits.vercel.app/logo/png/logo_trans.png" alt="logo" width="100"/>
            <h2>Your order has been placed</h2>
            <p>Your order has been received. Here is some information about your package</p>
            <br />
            <h4>Order ID: #${order.id}</h4>
          </div>

          <div>
            <h6 style="color:#947f57;">ORDERED PRODUCTS</h6>
            <hr />

            <ul style="list-style: none; padding: 0;">
              ${order.items
                .map(
                  (item) => `
                  <li style="border-bottom: 1px solid #ccc;display: flex;object-fit: cover;">
                    <img src=${
                      item.image
                    } alt="image" width="100px" height="100px"/>
                    <div style="margin-left: 1rem;">
                      <h4 style="margin: 0;">${item.name}</h4>
                      <p style="font-weight: bold;">Adet: ${
                        item.cartQuantity
                      }</p>
                      <h5 style="color: gray;">Fiyat: ${toCurrency(
                        item.price
                      )}</h5>
                    </div>
                  </li>
              `
                )
                .join("")}
            </ul>
            <h6>TOTAL: ${toCurrency(order.amount)}</h6>
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
      res.status(500).json({
        error: "Something went wrong. Please try again later",
      });
    }
  } else {
    res.status(405).end();
  }
};
